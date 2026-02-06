import { NextRequest, NextResponse } from "next/server";

// Lookup product by barcode using Open Food Facts (free, no API key needed)
export async function GET(request: NextRequest) {
  const barcode = request.nextUrl.searchParams.get("code");

  if (!barcode || !/^\d{8,14}$/.test(barcode)) {
    return NextResponse.json(
      { error: "Invalid barcode format." },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(
      `https://world.openfoodfacts.org/api/v2/product/${barcode}.json`,
      {
        headers: { "User-Agent": "FODMAPChecker/1.0" },
        next: { revalidate: 3600 }, // cache for 1 hour
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "Product not found." },
        { status: 404 }
      );
    }

    const data = await response.json();

    if (data.status !== 1 || !data.product) {
      return NextResponse.json(
        { error: "Product not found in database." },
        { status: 404 }
      );
    }

    const product = data.product;

    return NextResponse.json({
      product: {
        name: product.product_name || "Unknown product",
        brand: product.brands || "Unknown brand",
        ingredients: product.ingredients_text || "",
        ingredientsList: product.ingredients?.map(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (i: any) => i.text
        ) || [],
        nutriments: {
          sugars: product.nutriments?.sugars_100g,
          fiber: product.nutriments?.fiber_100g,
        },
        image: product.image_front_url || null,
        categories: product.categories || "",
      },
    });
  } catch (error) {
    console.error("Barcode lookup error:", error);
    return NextResponse.json(
      { error: "Failed to look up product. Please try again." },
      { status: 500 }
    );
  }
}
