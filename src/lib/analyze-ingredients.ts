export interface IngredientFlag {
  ingredient: string;
  matched: string;
  status: "avoid" | "caution";
  fodmapType?: string;
  note?: string;
}

export interface LocalVerdict {
  canEat: "yes" | "no" | "caution";
  flags: IngredientFlag[];
  summary: string;
}

// High-FODMAP ingredients to flag (lowercase)
const AVOID_INGREDIENTS: {
  pattern: RegExp;
  name: string;
  fodmapType: string;
  note?: string;
}[] = [
  // Fructans
  { pattern: /\bonion\b/i, name: "Onion", fodmapType: "Fructans", note: "Major FODMAP trigger" },
  { pattern: /\bgarlic\b/i, name: "Garlic", fodmapType: "Fructans", note: "Major FODMAP trigger" },
  { pattern: /\bleek/i, name: "Leek", fodmapType: "Fructans" },
  { pattern: /\bshallot/i, name: "Shallot", fodmapType: "Fructans" },
  { pattern: /\bartichoke/i, name: "Artichoke", fodmapType: "Fructans" },
  { pattern: /\basparagus/i, name: "Asparagus", fodmapType: "Fructans" },
  { pattern: /\bwheat\b(?!.*dextrin)/i, name: "Wheat", fodmapType: "Fructans", note: "Contains fructans. Look for GF alternatives" },
  { pattern: /\bwheat flour\b/i, name: "Wheat flour", fodmapType: "Fructans" },
  { pattern: /\bwhole wheat\b/i, name: "Whole wheat", fodmapType: "Fructans" },
  { pattern: /\brye\b/i, name: "Rye", fodmapType: "Fructans" },
  { pattern: /\bbarley\b/i, name: "Barley", fodmapType: "Fructans" },
  { pattern: /\binulin\b/i, name: "Inulin", fodmapType: "Fructans", note: "Hidden fiber additive - major bloating trigger" },
  { pattern: /\bchicory\s*(root|fiber|extract)?\b/i, name: "Chicory root", fodmapType: "Fructans", note: "Hidden in many 'fiber' products" },
  { pattern: /\bfructo\s*oligo/i, name: "FOS (Fructooligosaccharides)", fodmapType: "Fructans" },
  { pattern: /\bFOS\b/, name: "FOS", fodmapType: "Fructans" },
  { pattern: /\bgarlic powder\b/i, name: "Garlic powder", fodmapType: "Fructans" },
  { pattern: /\bonion powder\b/i, name: "Onion powder", fodmapType: "Fructans" },
  { pattern: /\bdehydrated onion/i, name: "Dehydrated onion", fodmapType: "Fructans" },
  { pattern: /\bdehydrated garlic/i, name: "Dehydrated garlic", fodmapType: "Fructans" },
  { pattern: /\bcashew/i, name: "Cashews", fodmapType: "GOS" },
  { pattern: /\bpistachio/i, name: "Pistachios", fodmapType: "Fructans" },

  // Lactose
  { pattern: /\bmilk\b(?!.*chocolate)/i, name: "Milk", fodmapType: "Lactose", note: "Contains lactose" },
  { pattern: /\bwhole milk\b/i, name: "Whole milk", fodmapType: "Lactose" },
  { pattern: /\bskim milk\b/i, name: "Skim milk", fodmapType: "Lactose" },
  { pattern: /\bmilk powder\b/i, name: "Milk powder", fodmapType: "Lactose" },
  { pattern: /\bdried milk\b/i, name: "Dried milk", fodmapType: "Lactose" },
  { pattern: /\bnonfat milk\b/i, name: "Nonfat milk", fodmapType: "Lactose" },
  { pattern: /\blactose\b/i, name: "Lactose", fodmapType: "Lactose" },
  { pattern: /\bwhey\b(?!.*protein isolate)/i, name: "Whey", fodmapType: "Lactose" },
  { pattern: /\bcream\b(?!.*of tartar)/i, name: "Cream", fodmapType: "Lactose" },
  { pattern: /\bcondensed milk\b/i, name: "Condensed milk", fodmapType: "Lactose" },
  { pattern: /\bevaporated milk\b/i, name: "Evaporated milk", fodmapType: "Lactose" },
  { pattern: /\bricotta\b/i, name: "Ricotta", fodmapType: "Lactose" },
  { pattern: /\bcottage cheese\b/i, name: "Cottage cheese", fodmapType: "Lactose" },
  { pattern: /\bice cream\b/i, name: "Ice cream", fodmapType: "Lactose" },
  { pattern: /\byogurt\b(?!.*lactose.free)/i, name: "Yogurt", fodmapType: "Lactose" },

  // Fructose
  { pattern: /\bhoney\b/i, name: "Honey", fodmapType: "Excess Fructose" },
  { pattern: /\bagave\b/i, name: "Agave", fodmapType: "Excess Fructose" },
  { pattern: /\bhigh.fructose\s*corn\s*syrup\b/i, name: "High-fructose corn syrup", fodmapType: "Excess Fructose" },
  { pattern: /\bHFCS\b/, name: "HFCS", fodmapType: "Excess Fructose" },
  { pattern: /\bfructose\b(?!.*glucose)/i, name: "Fructose", fodmapType: "Excess Fructose" },
  { pattern: /\bapple\s*juice\s*concentrate\b/i, name: "Apple juice concentrate", fodmapType: "Excess Fructose" },
  { pattern: /\bpear\s*juice\s*concentrate\b/i, name: "Pear juice concentrate", fodmapType: "Excess Fructose" },
  { pattern: /\bmango\s*(puree|concentrate|juice)\b/i, name: "Mango concentrate", fodmapType: "Excess Fructose" },
  { pattern: /\bmolasses\b/i, name: "Molasses", fodmapType: "Excess Fructose" },

  // Polyols
  { pattern: /\bsorbitol\b/i, name: "Sorbitol", fodmapType: "Polyols", note: "Sugar alcohol - causes bloating" },
  { pattern: /\bmannitol\b/i, name: "Mannitol", fodmapType: "Polyols" },
  { pattern: /\bxylitol\b/i, name: "Xylitol", fodmapType: "Polyols" },
  { pattern: /\bmaltitol\b/i, name: "Maltitol", fodmapType: "Polyols" },
  { pattern: /\bisomalt\b/i, name: "Isomalt", fodmapType: "Polyols" },
  { pattern: /\berythritol\b/i, name: "Erythritol", fodmapType: "Polyols" },
  { pattern: /\bhydrogenated starch/i, name: "Hydrogenated starch hydrolysates", fodmapType: "Polyols" },

  // GOS
  { pattern: /\bchickpea/i, name: "Chickpeas", fodmapType: "GOS" },
  { pattern: /\blentil/i, name: "Lentils", fodmapType: "GOS" },
  { pattern: /\bkidney bean/i, name: "Kidney beans", fodmapType: "GOS" },
  { pattern: /\bblack bean/i, name: "Black beans", fodmapType: "GOS" },
  { pattern: /\bbaked bean/i, name: "Baked beans", fodmapType: "GOS" },
  { pattern: /\bsoy\s*bean/i, name: "Soybeans", fodmapType: "GOS" },
  { pattern: /\bsplit pea/i, name: "Split peas", fodmapType: "GOS" },
];

// Caution ingredients
const CAUTION_INGREDIENTS: {
  pattern: RegExp;
  name: string;
  note: string;
}[] = [
  { pattern: /\bnatural\s*flavou?r/i, name: "Natural flavors", note: "May contain hidden garlic/onion. Check with manufacturer" },
  { pattern: /\bspices\b/i, name: "Spices", note: "Vague label - may contain onion/garlic powder" },
  { pattern: /\bseasoning/i, name: "Seasoning", note: "Often contains onion/garlic powder" },
  { pattern: /\bwheat\s*dextrin/i, name: "Wheat dextrin", note: "Processed wheat fiber. Some tolerate it, but may trigger symptoms during elimination" },
  { pattern: /\bmaltodextrin\b/i, name: "Maltodextrin", note: "Usually OK even from wheat (highly processed), but some are sensitive" },
  { pattern: /\bsoy\s*lecithin/i, name: "Soy lecithin", note: "Usually OK in small amounts (it's fat-based, not protein)" },
  { pattern: /\bmodified\s*(corn|food)\s*starch/i, name: "Modified starch", note: "Usually OK but check source" },
  { pattern: /\bcarob\b/i, name: "Carob", note: "Can be high FODMAP in large amounts" },
];

// Known safe ingredients (won't be flagged)
const SAFE_OVERRIDES: RegExp[] = [
  /\bwhey\s*protein\s*isolate\b/i,
  /\blactose.free\b/i,
  /\bgluten.free\b/i,
  /\bgarlic.infused\s*(olive\s*)?oil\b/i,
  /\bgarlic\s*oil\b/i, // fat-soluble, FODMAPs are water-soluble
];

export function analyzeIngredients(ingredientText: string): LocalVerdict {
  if (!ingredientText || ingredientText.trim().length === 0) {
    return {
      canEat: "caution",
      flags: [],
      summary: "No ingredients listed. Check the product label carefully.",
    };
  }

  const text = ingredientText.toLowerCase();
  const flags: IngredientFlag[] = [];

  // Check if any safe overrides apply (to avoid false positives)
  const safeText = SAFE_OVERRIDES.some((r) => r.test(text));

  // Check avoid ingredients
  for (const item of AVOID_INGREDIENTS) {
    if (item.pattern.test(ingredientText)) {
      // Don't flag if a safe override covers it
      const isSafeOverride = SAFE_OVERRIDES.some((r) => {
        const match = ingredientText.match(item.pattern);
        if (!match) return false;
        // Check if the safe override pattern covers the same area
        const idx = match.index || 0;
        const surrounding = ingredientText.substring(
          Math.max(0, idx - 20),
          idx + match[0].length + 20
        );
        return r.test(surrounding);
      });

      if (!isSafeOverride) {
        flags.push({
          ingredient: item.name,
          matched: item.name,
          status: "avoid",
          fodmapType: item.fodmapType,
          note: item.note,
        });
      }
    }
  }

  // Check caution ingredients
  for (const item of CAUTION_INGREDIENTS) {
    if (item.pattern.test(ingredientText)) {
      flags.push({
        ingredient: item.name,
        matched: item.name,
        status: "caution",
        note: item.note,
      });
    }
  }

  // Determine verdict
  const avoidCount = flags.filter((f) => f.status === "avoid").length;
  const cautionCount = flags.filter((f) => f.status === "caution").length;

  let canEat: "yes" | "no" | "caution";
  let summary: string;

  if (avoidCount > 0) {
    canEat = "no";
    const triggers = flags
      .filter((f) => f.status === "avoid")
      .map((f) => f.ingredient)
      .join(", ");
    summary = `AVOID - Contains ${triggers} which ${avoidCount === 1 ? "is" : "are"} high FODMAP.`;
  } else if (cautionCount > 0) {
    canEat = "caution";
    summary = `MAYBE - No definite high-FODMAP ingredients found, but contains ${cautionCount} ingredient${cautionCount > 1 ? "s" : ""} that may be problematic. Check details below.`;
  } else {
    canEat = "yes";
    summary = "LOOKS SAFE - No high-FODMAP ingredients detected. Always double-check the label for hidden ingredients.";
  }

  return { canEat, flags, summary };
}
