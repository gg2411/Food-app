import { NextRequest, NextResponse } from "next/server";
import {
  FODMAP_SYSTEM_PROMPT,
  MENU_ANALYSIS_PROMPT,
  BARCODE_ANALYSIS_PROMPT,
} from "@/lib/fodmap-prompt";

// Rate limiting: simple in-memory store (resets on cold start, fine for personal use)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 30; // requests per window
const RATE_WINDOW = 60_000; // 1 minute

function checkRateLimit(key: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(key);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(key, { count: 1, resetAt: now + RATE_WINDOW });
    return true;
  }

  if (entry.count >= RATE_LIMIT) {
    return false;
  }

  entry.count++;
  return true;
}

function getClientIp(request: NextRequest): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request);
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please wait a moment." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { apiKey, mode, content, imageBase64 } = body;

    // Validate API key format
    if (!apiKey || typeof apiKey !== "string" || !apiKey.startsWith("sk-")) {
      return NextResponse.json(
        { error: "Invalid API key. Please check your settings." },
        { status: 401 }
      );
    }

    // Validate mode
    if (!["menu", "barcode", "question"].includes(mode)) {
      return NextResponse.json({ error: "Invalid analysis mode." }, { status: 400 });
    }

    // Validate content
    if (!content && !imageBase64) {
      return NextResponse.json(
        { error: "No content provided for analysis." },
        { status: 400 }
      );
    }

    // Sanitize: strip any potential injection from content
    const sanitizedContent =
      typeof content === "string" ? content.slice(0, 5000) : "";

    let systemPrompt: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let messages: any[];

    if (mode === "menu" && imageBase64) {
      // Validate base64 image
      if (typeof imageBase64 !== "string" || imageBase64.length > 20_000_000) {
        return NextResponse.json(
          { error: "Image too large. Please use a smaller image." },
          { status: 400 }
        );
      }

      systemPrompt = MENU_ANALYSIS_PROMPT;
      messages = [
        { role: "system", content: systemPrompt },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Please analyze this restaurant menu photo and tell me which items are safe, which to avoid, and which need caution on the low-FODMAP diet. Suggest modifications where possible.",
            },
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${imageBase64}`,
                detail: "high",
              },
            },
          ],
        },
      ];
    } else if (mode === "barcode") {
      systemPrompt = BARCODE_ANALYSIS_PROMPT;
      messages = [
        { role: "system", content: systemPrompt },
        {
          role: "user",
          content: `Analyze these product details for FODMAP safety:\n\n${sanitizedContent}`,
        },
      ];
    } else {
      systemPrompt = FODMAP_SYSTEM_PROMPT;
      messages = [
        { role: "system", content: systemPrompt },
        {
          role: "user",
          content: sanitizedContent,
        },
      ];
    }

    // Call OpenAI
    const openaiResponse = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: mode === "menu" ? "gpt-4o" : "gpt-4o-mini",
          messages,
          max_tokens: 2000,
          temperature: 0.3,
        }),
      }
    );

    if (!openaiResponse.ok) {
      const errData = await openaiResponse.json().catch(() => ({}));
      const errMsg =
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (errData as any)?.error?.message || `OpenAI API error: ${openaiResponse.status}`;

      if (openaiResponse.status === 401) {
        return NextResponse.json(
          { error: "Invalid API key. Please check your key in settings." },
          { status: 401 }
        );
      }
      if (openaiResponse.status === 429) {
        return NextResponse.json(
          { error: "OpenAI rate limit reached. Please try again shortly." },
          { status: 429 }
        );
      }

      return NextResponse.json({ error: errMsg }, { status: 502 });
    }

    const data = await openaiResponse.json();
    const reply = data.choices?.[0]?.message?.content || "";

    // Try to parse as JSON, fall back to raw text
    let parsed;
    try {
      // Extract JSON from markdown code blocks if present
      const jsonMatch = reply.match(/```(?:json)?\s*([\s\S]*?)```/);
      const jsonStr = jsonMatch ? jsonMatch[1] : reply;
      parsed = JSON.parse(jsonStr);
    } catch {
      parsed = { raw: reply };
    }

    return NextResponse.json({ result: parsed });
  } catch (error) {
    console.error("Analyze API error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
