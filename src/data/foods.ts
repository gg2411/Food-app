export type FoodStatus = "safe" | "avoid" | "caution";

export interface Food {
  name: string;
  status: FoodStatus;
  category: string;
  note?: string;
  fodmapType?: string;
}

export const foods: Food[] = [
  // ===== VEGETABLES =====
  // Safe vegetables
  { name: "Zucchini", status: "safe", category: "Vegetables", note: "Great for constipation relief" },
  { name: "Carrots", status: "safe", category: "Vegetables", note: "Great for constipation relief" },
  { name: "Bell peppers", status: "safe", category: "Vegetables" },
  { name: "Red bell pepper", status: "safe", category: "Vegetables" },
  { name: "Green bell pepper", status: "safe", category: "Vegetables" },
  { name: "Yellow bell pepper", status: "safe", category: "Vegetables" },
  { name: "Spinach", status: "safe", category: "Vegetables" },
  { name: "Kale", status: "safe", category: "Vegetables" },
  { name: "Cucumber", status: "safe", category: "Vegetables" },
  { name: "Eggplant", status: "safe", category: "Vegetables" },
  { name: "Green beans", status: "safe", category: "Vegetables" },
  { name: "Lettuce", status: "safe", category: "Vegetables" },
  { name: "Romaine lettuce", status: "safe", category: "Vegetables" },
  { name: "Iceberg lettuce", status: "safe", category: "Vegetables" },
  { name: "Tomato", status: "safe", category: "Vegetables" },
  { name: "Tomatoes", status: "safe", category: "Vegetables" },
  { name: "Cherry tomatoes", status: "safe", category: "Vegetables" },
  { name: "Bok choy", status: "safe", category: "Vegetables" },
  { name: "Chives", status: "safe", category: "Vegetables", note: "Safe garlic/onion alternative for flavor" },
  { name: "Ginger", status: "safe", category: "Vegetables", note: "Also helps with digestion" },
  { name: "Parsnip", status: "safe", category: "Vegetables" },
  { name: "Turnip", status: "safe", category: "Vegetables" },
  { name: "Radish", status: "safe", category: "Vegetables" },
  { name: "Bean sprouts", status: "safe", category: "Vegetables" },
  { name: "Bamboo shoots", status: "safe", category: "Vegetables" },
  { name: "Potato", status: "safe", category: "Vegetables" },
  { name: "Sweet potato", status: "safe", category: "Vegetables", note: "Keep to 1/2 cup per serving" },
  { name: "Olives", status: "safe", category: "Vegetables" },

  // Avoid vegetables
  { name: "Onion", status: "avoid", category: "Vegetables", fodmapType: "Fructans", note: "One of the biggest FODMAP triggers" },
  { name: "Onions", status: "avoid", category: "Vegetables", fodmapType: "Fructans", note: "One of the biggest FODMAP triggers" },
  { name: "Red onion", status: "avoid", category: "Vegetables", fodmapType: "Fructans" },
  { name: "White onion", status: "avoid", category: "Vegetables", fodmapType: "Fructans" },
  { name: "Spring onion (white part)", status: "avoid", category: "Vegetables", fodmapType: "Fructans" },
  { name: "Green onion (white part)", status: "avoid", category: "Vegetables", fodmapType: "Fructans" },
  { name: "Garlic", status: "avoid", category: "Vegetables", fodmapType: "Fructans", note: "Use garlic-infused olive oil instead!" },
  { name: "Leek", status: "avoid", category: "Vegetables", fodmapType: "Fructans" },
  { name: "Leeks", status: "avoid", category: "Vegetables", fodmapType: "Fructans" },
  { name: "Shallots", status: "avoid", category: "Vegetables", fodmapType: "Fructans" },
  { name: "Shallot", status: "avoid", category: "Vegetables", fodmapType: "Fructans" },
  { name: "Cauliflower", status: "avoid", category: "Vegetables", fodmapType: "Polyols (Mannitol)" },
  { name: "Mushrooms", status: "avoid", category: "Vegetables", fodmapType: "Polyols (Mannitol)" },
  { name: "Mushroom", status: "avoid", category: "Vegetables", fodmapType: "Polyols (Mannitol)" },
  { name: "Asparagus", status: "avoid", category: "Vegetables", fodmapType: "Fructans" },
  { name: "Artichoke", status: "avoid", category: "Vegetables", fodmapType: "Fructans" },
  { name: "Artichokes", status: "avoid", category: "Vegetables", fodmapType: "Fructans" },
  { name: "Jerusalem artichoke", status: "avoid", category: "Vegetables", fodmapType: "Fructans" },
  { name: "Broccoli", status: "caution", category: "Vegetables", note: "Small portions (3/4 cup) may be OK, heads are higher FODMAP than stalks" },
  { name: "Brussels sprouts", status: "avoid", category: "Vegetables", fodmapType: "Fructans & GOS" },
  { name: "Cabbage", status: "caution", category: "Vegetables", note: "Small amounts may be tolerated, Savoy cabbage is higher FODMAP" },
  { name: "Celery", status: "caution", category: "Vegetables", note: "More than 1/4 stalk can be high FODMAP" },
  { name: "Corn", status: "caution", category: "Vegetables", note: "Half a cob or 1/2 cup is OK; larger amounts are high FODMAP" },
  { name: "Peas", status: "avoid", category: "Vegetables", fodmapType: "Fructans & GOS" },
  { name: "Snow peas", status: "avoid", category: "Vegetables", fodmapType: "Fructans & GOS" },
  { name: "Sugar snap peas", status: "avoid", category: "Vegetables", fodmapType: "Fructans & GOS" },
  { name: "Beetroot", status: "avoid", category: "Vegetables", fodmapType: "Fructans" },
  { name: "Beet", status: "avoid", category: "Vegetables", fodmapType: "Fructans" },

  // ===== FRUITS =====
  // Safe fruits
  { name: "Strawberries", status: "safe", category: "Fruits", note: "Max 1 serving per meal" },
  { name: "Strawberry", status: "safe", category: "Fruits", note: "Max 1 serving per meal" },
  { name: "Blueberries", status: "safe", category: "Fruits", note: "Max 1 serving per meal" },
  { name: "Blueberry", status: "safe", category: "Fruits", note: "Max 1 serving per meal" },
  { name: "Raspberries", status: "safe", category: "Fruits", note: "Small portions only, max 1 serving per meal" },
  { name: "Raspberry", status: "safe", category: "Fruits", note: "Small portions only" },
  { name: "Kiwi", status: "safe", category: "Fruits", note: "Amazing for constipation! Eat 1-2 per day" },
  { name: "Kiwifruit", status: "safe", category: "Fruits", note: "Amazing for constipation! Eat 1-2 per day" },
  { name: "Orange", status: "safe", category: "Fruits", note: "Max 1 serving per meal" },
  { name: "Oranges", status: "safe", category: "Fruits", note: "Max 1 serving per meal" },
  { name: "Pineapple", status: "safe", category: "Fruits", note: "Max 1 serving per meal" },
  { name: "Banana", status: "safe", category: "Fruits", note: "Unripe/firm bananas are best; ripe bananas have more fructans" },
  { name: "Bananas", status: "safe", category: "Fruits", note: "Unripe/firm bananas are best; ripe bananas have more fructans" },
  { name: "Grapes", status: "safe", category: "Fruits", note: "Max 1 serving per meal" },
  { name: "Cantaloupe", status: "safe", category: "Fruits" },
  { name: "Honeydew melon", status: "safe", category: "Fruits" },
  { name: "Papaya", status: "safe", category: "Fruits" },
  { name: "Passion fruit", status: "safe", category: "Fruits" },
  { name: "Dragon fruit", status: "safe", category: "Fruits" },
  { name: "Cranberries", status: "safe", category: "Fruits" },
  { name: "Lemon", status: "safe", category: "Fruits" },
  { name: "Lime", status: "safe", category: "Fruits" },
  { name: "Mandarin", status: "safe", category: "Fruits" },
  { name: "Clementine", status: "safe", category: "Fruits" },
  { name: "Tangerine", status: "safe", category: "Fruits" },
  { name: "Rhubarb", status: "safe", category: "Fruits" },

  // Avoid fruits
  { name: "Apple", status: "avoid", category: "Fruits", fodmapType: "Fructose & Polyols (Sorbitol)" },
  { name: "Apples", status: "avoid", category: "Fruits", fodmapType: "Fructose & Polyols (Sorbitol)" },
  { name: "Pear", status: "avoid", category: "Fruits", fodmapType: "Fructose & Polyols (Sorbitol)" },
  { name: "Pears", status: "avoid", category: "Fruits", fodmapType: "Fructose & Polyols (Sorbitol)" },
  { name: "Mango", status: "avoid", category: "Fruits", fodmapType: "Fructose" },
  { name: "Cherries", status: "avoid", category: "Fruits", fodmapType: "Fructose & Polyols (Sorbitol)" },
  { name: "Cherry", status: "avoid", category: "Fruits", fodmapType: "Fructose & Polyols (Sorbitol)" },
  { name: "Peach", status: "avoid", category: "Fruits", fodmapType: "Polyols (Sorbitol)" },
  { name: "Peaches", status: "avoid", category: "Fruits", fodmapType: "Polyols (Sorbitol)" },
  { name: "Plum", status: "avoid", category: "Fruits", fodmapType: "Polyols (Sorbitol)" },
  { name: "Plums", status: "avoid", category: "Fruits", fodmapType: "Polyols (Sorbitol)" },
  { name: "Nectarine", status: "avoid", category: "Fruits", fodmapType: "Polyols (Sorbitol)" },
  { name: "Nectarines", status: "avoid", category: "Fruits", fodmapType: "Polyols (Sorbitol)" },
  { name: "Watermelon", status: "avoid", category: "Fruits", fodmapType: "Fructose & Polyols (Mannitol)" },
  { name: "Apricot", status: "avoid", category: "Fruits", fodmapType: "Polyols (Sorbitol)" },
  { name: "Apricots", status: "avoid", category: "Fruits", fodmapType: "Polyols (Sorbitol)" },
  { name: "Dried fruit", status: "avoid", category: "Fruits", fodmapType: "Fructose", note: "Concentrated FODMAPs" },
  { name: "Dates", status: "avoid", category: "Fruits", fodmapType: "Fructose" },
  { name: "Date", status: "avoid", category: "Fruits", fodmapType: "Fructose" },
  { name: "Figs", status: "avoid", category: "Fruits", fodmapType: "Fructose" },
  { name: "Persimmon", status: "avoid", category: "Fruits", fodmapType: "Fructose" },
  { name: "Lychee", status: "avoid", category: "Fruits", fodmapType: "Polyols (Sorbitol)" },
  { name: "Blackberries", status: "avoid", category: "Fruits", fodmapType: "Polyols" },
  { name: "Pomegranate", status: "avoid", category: "Fruits", fodmapType: "Fructose" },

  // ===== SWEETENERS =====
  // Safe sweeteners
  { name: "Maple syrup", status: "safe", category: "Sweeteners" },
  { name: "White sugar", status: "safe", category: "Sweeteners" },
  { name: "Sugar", status: "safe", category: "Sweeteners", note: "Regular white/brown sugar is fine" },
  { name: "Brown sugar", status: "safe", category: "Sweeteners" },
  { name: "Coconut sugar", status: "safe", category: "Sweeteners", note: "OK in moderation" },
  { name: "Dark chocolate", status: "safe", category: "Sweeteners", note: "70%+ cocoa recommended" },
  { name: "Chocolate", status: "caution", category: "Sweeteners", note: "Dark (70%+) is safe; milk chocolate contains lactose. Avoid 'sugar-free'" },
  { name: "Lactose-free chocolate", status: "safe", category: "Sweeteners" },
  { name: "Stevia", status: "safe", category: "Sweeteners" },
  { name: "Aspartame", status: "safe", category: "Sweeteners" },
  { name: "Glucose", status: "safe", category: "Sweeteners" },

  // Avoid sweeteners
  { name: "Honey", status: "avoid", category: "Sweeteners", fodmapType: "Fructose" },
  { name: "Agave", status: "avoid", category: "Sweeteners", fodmapType: "Fructose" },
  { name: "Agave syrup", status: "avoid", category: "Sweeteners", fodmapType: "Fructose" },
  { name: "Agave nectar", status: "avoid", category: "Sweeteners", fodmapType: "Fructose" },
  { name: "High-fructose corn syrup", status: "avoid", category: "Sweeteners", fodmapType: "Fructose" },
  { name: "HFCS", status: "avoid", category: "Sweeteners", fodmapType: "Fructose" },
  { name: "Corn syrup", status: "avoid", category: "Sweeteners", fodmapType: "Fructose" },
  { name: "Sorbitol", status: "avoid", category: "Sweeteners", fodmapType: "Polyols" },
  { name: "Xylitol", status: "avoid", category: "Sweeteners", fodmapType: "Polyols" },
  { name: "Erythritol", status: "avoid", category: "Sweeteners", fodmapType: "Polyols" },
  { name: "Maltitol", status: "avoid", category: "Sweeteners", fodmapType: "Polyols" },
  { name: "Mannitol", status: "avoid", category: "Sweeteners", fodmapType: "Polyols" },
  { name: "Isomalt", status: "avoid", category: "Sweeteners", fodmapType: "Polyols" },
  { name: "Date syrup", status: "avoid", category: "Sweeteners", fodmapType: "Fructose" },
  { name: "Molasses", status: "avoid", category: "Sweeteners", fodmapType: "Fructose" },
  { name: "Sugar-free gum", status: "avoid", category: "Sweeteners", note: "Contains polyols (sugar alcohols)" },
  { name: "Sugar-free candy", status: "avoid", category: "Sweeteners", note: "Contains polyols (sugar alcohols)" },

  // ===== GRAINS & CARBS =====
  // Safe grains
  { name: "Rice", status: "safe", category: "Grains & Carbs" },
  { name: "White rice", status: "safe", category: "Grains & Carbs" },
  { name: "Brown rice", status: "safe", category: "Grains & Carbs" },
  { name: "Quinoa", status: "safe", category: "Grains & Carbs" },
  { name: "Gluten-free pasta", status: "safe", category: "Grains & Carbs" },
  { name: "Rice pasta", status: "safe", category: "Grains & Carbs" },
  { name: "Oats", status: "safe", category: "Grains & Carbs", note: "Keep to 1/2 cup cooked" },
  { name: "Oatmeal", status: "safe", category: "Grains & Carbs", note: "Keep to 1/2 cup cooked" },
  { name: "Rice cakes", status: "safe", category: "Grains & Carbs" },
  { name: "Corn tortillas", status: "safe", category: "Grains & Carbs" },
  { name: "Corn chips", status: "safe", category: "Grains & Carbs" },
  { name: "Popcorn", status: "safe", category: "Grains & Carbs" },
  { name: "Gluten-free bread", status: "safe", category: "Grains & Carbs" },
  { name: "Sourdough bread", status: "safe", category: "Grains & Carbs", note: "Traditionally fermented sourdough (spelt) is lower FODMAP" },
  { name: "Buckwheat", status: "safe", category: "Grains & Carbs" },
  { name: "Millet", status: "safe", category: "Grains & Carbs" },
  { name: "Polenta", status: "safe", category: "Grains & Carbs" },
  { name: "Tapioca", status: "safe", category: "Grains & Carbs" },
  { name: "Rice noodles", status: "safe", category: "Grains & Carbs" },
  { name: "Soba noodles", status: "safe", category: "Grains & Carbs", note: "Only if 100% buckwheat" },

  // Avoid grains
  { name: "Wheat", status: "avoid", category: "Grains & Carbs", fodmapType: "Fructans" },
  { name: "Bread", status: "avoid", category: "Grains & Carbs", fodmapType: "Fructans", note: "Regular wheat bread - try gluten-free or sourdough instead" },
  { name: "White bread", status: "avoid", category: "Grains & Carbs", fodmapType: "Fructans" },
  { name: "Whole wheat bread", status: "avoid", category: "Grains & Carbs", fodmapType: "Fructans" },
  { name: "Pasta", status: "avoid", category: "Grains & Carbs", fodmapType: "Fructans", note: "Regular wheat pasta - try gluten-free pasta instead" },
  { name: "Wraps", status: "avoid", category: "Grains & Carbs", fodmapType: "Fructans", note: "Wheat-based wraps - try corn tortillas instead" },
  { name: "Tortilla wraps", status: "avoid", category: "Grains & Carbs", fodmapType: "Fructans" },
  { name: "Rye", status: "avoid", category: "Grains & Carbs", fodmapType: "Fructans" },
  { name: "Rye bread", status: "avoid", category: "Grains & Carbs", fodmapType: "Fructans" },
  { name: "Couscous", status: "avoid", category: "Grains & Carbs", fodmapType: "Fructans", note: "Made from wheat" },
  { name: "Barley", status: "avoid", category: "Grains & Carbs", fodmapType: "Fructans" },
  { name: "Semolina", status: "avoid", category: "Grains & Carbs", fodmapType: "Fructans" },
  { name: "Flour tortilla", status: "avoid", category: "Grains & Carbs", fodmapType: "Fructans" },
  { name: "Naan bread", status: "avoid", category: "Grains & Carbs", fodmapType: "Fructans" },
  { name: "Crackers", status: "avoid", category: "Grains & Carbs", fodmapType: "Fructans", note: "Wheat-based crackers - try rice cakes instead" },
  { name: "Cereal", status: "caution", category: "Grains & Carbs", note: "Most cereals contain wheat. Check ingredients for wheat, honey, and HFCS" },
  { name: "Granola", status: "caution", category: "Grains & Carbs", note: "Often contains honey and wheat. Make your own with oats + maple syrup" },

  // ===== DAIRY =====
  // Safe dairy
  { name: "Lactose-free milk", status: "safe", category: "Dairy" },
  { name: "Lactose-free yogurt", status: "safe", category: "Dairy" },
  { name: "Lactose-free Greek yogurt", status: "safe", category: "Dairy" },
  { name: "Hard cheese", status: "safe", category: "Dairy", note: "Naturally low in lactose" },
  { name: "Parmesan", status: "safe", category: "Dairy", note: "Naturally very low in lactose" },
  { name: "Cheddar", status: "safe", category: "Dairy", note: "Naturally low in lactose" },
  { name: "Feta", status: "safe", category: "Dairy", note: "Lower in lactose" },
  { name: "Brie", status: "safe", category: "Dairy", note: "Lower in lactose" },
  { name: "Camembert", status: "safe", category: "Dairy", note: "Lower in lactose" },
  { name: "Swiss cheese", status: "safe", category: "Dairy" },
  { name: "Mozzarella", status: "safe", category: "Dairy", note: "Lower in lactose" },
  { name: "Butter", status: "safe", category: "Dairy", note: "Very low lactose" },
  { name: "Almond milk", status: "safe", category: "Dairy" },
  { name: "Oat milk", status: "safe", category: "Dairy", note: "Small portions; check for added inulin/chicory root" },
  { name: "Coconut milk", status: "safe", category: "Dairy" },
  { name: "Rice milk", status: "safe", category: "Dairy" },
  { name: "Soy milk (made from soy protein)", status: "safe", category: "Dairy", note: "Only if made from soy protein, NOT whole soybeans" },

  // Avoid dairy
  { name: "Milk", status: "avoid", category: "Dairy", fodmapType: "Lactose", note: "Use lactose-free milk instead" },
  { name: "Cow's milk", status: "avoid", category: "Dairy", fodmapType: "Lactose" },
  { name: "Yogurt", status: "avoid", category: "Dairy", fodmapType: "Lactose", note: "Regular yogurt - try lactose-free Greek yogurt instead" },
  { name: "Greek yogurt", status: "caution", category: "Dairy", note: "Regular Greek yogurt has some lactose. Lactose-free Greek yogurt is safe" },
  { name: "Ice cream", status: "avoid", category: "Dairy", fodmapType: "Lactose", note: "Try lactose-free or coconut-based alternatives" },
  { name: "Ricotta", status: "avoid", category: "Dairy", fodmapType: "Lactose" },
  { name: "Cottage cheese", status: "avoid", category: "Dairy", fodmapType: "Lactose" },
  { name: "Cream cheese", status: "avoid", category: "Dairy", fodmapType: "Lactose" },
  { name: "Sour cream", status: "avoid", category: "Dairy", fodmapType: "Lactose" },
  { name: "Whipped cream", status: "avoid", category: "Dairy", fodmapType: "Lactose" },
  { name: "Cream", status: "avoid", category: "Dairy", fodmapType: "Lactose" },
  { name: "Condensed milk", status: "avoid", category: "Dairy", fodmapType: "Lactose" },
  { name: "Evaporated milk", status: "avoid", category: "Dairy", fodmapType: "Lactose" },
  { name: "Soy milk (whole soybeans)", status: "avoid", category: "Dairy", fodmapType: "GOS", note: "Soy milk from whole soybeans is high FODMAP" },

  // ===== LEGUMES =====
  { name: "Lentils", status: "avoid", category: "Legumes", fodmapType: "GOS (Galacto-oligosaccharides)" },
  { name: "Chickpeas", status: "avoid", category: "Legumes", fodmapType: "GOS & Fructans" },
  { name: "Hummus", status: "avoid", category: "Legumes", fodmapType: "GOS & Fructans", note: "Made from chickpeas" },
  { name: "Black beans", status: "avoid", category: "Legumes", fodmapType: "GOS" },
  { name: "Kidney beans", status: "avoid", category: "Legumes", fodmapType: "GOS" },
  { name: "Lima beans", status: "avoid", category: "Legumes", fodmapType: "GOS" },
  { name: "Baked beans", status: "avoid", category: "Legumes", fodmapType: "GOS" },
  { name: "Beans", status: "avoid", category: "Legumes", fodmapType: "GOS" },
  { name: "Soybeans", status: "avoid", category: "Legumes", fodmapType: "GOS" },
  { name: "Split peas", status: "avoid", category: "Legumes", fodmapType: "GOS" },
  { name: "Falafel", status: "avoid", category: "Legumes", fodmapType: "GOS & Fructans", note: "Made from chickpeas" },
  { name: "Edamame", status: "caution", category: "Legumes", note: "Small portions only" },
  { name: "Canned lentils", status: "caution", category: "Legumes", note: "Canned & rinsed lentils are lower FODMAP (1/2 cup)" },
  { name: "Canned chickpeas", status: "caution", category: "Legumes", note: "Canned & rinsed chickpeas are lower FODMAP (1/4 cup)" },

  // ===== PROTEIN =====
  // Safe proteins
  { name: "Eggs", status: "safe", category: "Protein" },
  { name: "Egg", status: "safe", category: "Protein" },
  { name: "Fish", status: "safe", category: "Protein" },
  { name: "Salmon", status: "safe", category: "Protein" },
  { name: "Tuna", status: "safe", category: "Protein" },
  { name: "Cod", status: "safe", category: "Protein" },
  { name: "Tilapia", status: "safe", category: "Protein" },
  { name: "Sardines", status: "safe", category: "Protein" },
  { name: "Mackerel", status: "safe", category: "Protein" },
  { name: "Shrimp", status: "safe", category: "Protein" },
  { name: "Prawns", status: "safe", category: "Protein" },
  { name: "Crab", status: "safe", category: "Protein" },
  { name: "Lobster", status: "safe", category: "Protein" },
  { name: "Scallops", status: "safe", category: "Protein" },
  { name: "Mussels", status: "safe", category: "Protein" },
  { name: "Tofu", status: "safe", category: "Protein", note: "Firm tofu is best; silken tofu is higher FODMAP" },
  { name: "Firm tofu", status: "safe", category: "Protein" },
  { name: "Tempeh", status: "safe", category: "Protein" },
  { name: "Beef", status: "safe", category: "Protein" },
  { name: "Steak", status: "safe", category: "Protein" },
  { name: "Lamb", status: "safe", category: "Protein" },
  { name: "Pork", status: "safe", category: "Protein" },
  { name: "Turkey", status: "safe", category: "Protein" },
  { name: "Duck", status: "safe", category: "Protein" },
  { name: "Chicken", status: "safe", category: "Protein", note: "Plain chicken is low FODMAP (watch for marinades with garlic/onion)" },
  { name: "Bacon", status: "safe", category: "Protein", note: "Plain bacon without garlic/onion flavoring" },

  // Caution proteins
  { name: "Silken tofu", status: "caution", category: "Protein", note: "Higher FODMAP than firm tofu" },
  { name: "Sausage", status: "caution", category: "Protein", note: "Often contains garlic and onion — check ingredients" },
  { name: "Deli meat", status: "caution", category: "Protein", note: "Often contains garlic, onion, or HFCS" },
  { name: "Protein bar", status: "avoid", category: "Protein", note: "Usually contains polyols (sugar alcohols), chicory root, or honey" },
  { name: "Protein bars", status: "avoid", category: "Protein", note: "Usually contains polyols (sugar alcohols), chicory root, or honey" },

  // ===== FATS =====
  { name: "Olive oil", status: "safe", category: "Fats" },
  { name: "Garlic-infused olive oil", status: "safe", category: "Fats", note: "FODMAPs are water-soluble, not fat-soluble - safe garlic flavor!" },
  { name: "Coconut oil", status: "safe", category: "Fats" },
  { name: "Avocado", status: "caution", category: "Fats", note: "Max 1/4 avocado per meal (1/8 is safest)" },
  { name: "Nuts", status: "safe", category: "Fats", note: "Small portions (10-15 nuts)" },
  { name: "Walnuts", status: "safe", category: "Fats", note: "Small portions" },
  { name: "Almonds", status: "safe", category: "Fats", note: "Max 10 almonds per sitting" },
  { name: "Peanuts", status: "safe", category: "Fats" },
  { name: "Peanut butter", status: "safe", category: "Fats", note: "2 tablespoons is safe" },
  { name: "Pecans", status: "safe", category: "Fats", note: "Small portions" },
  { name: "Macadamia nuts", status: "safe", category: "Fats" },
  { name: "Pine nuts", status: "safe", category: "Fats" },
  { name: "Sunflower seeds", status: "safe", category: "Fats" },
  { name: "Pumpkin seeds", status: "safe", category: "Fats" },
  { name: "Sesame seeds", status: "safe", category: "Fats" },
  { name: "Chia seeds", status: "safe", category: "Fats", note: "Great for constipation! 1 tbsp/day" },
  { name: "Flax seeds", status: "safe", category: "Fats", note: "Good for constipation" },
  { name: "Hemp seeds", status: "safe", category: "Fats" },
  { name: "Tahini", status: "safe", category: "Fats" },
  { name: "Cashews", status: "avoid", category: "Fats", fodmapType: "GOS", note: "High FODMAP even in small amounts" },
  { name: "Pistachios", status: "avoid", category: "Fats", fodmapType: "Fructans" },

  // ===== DRINKS =====
  { name: "Water", status: "safe", category: "Drinks" },
  { name: "Coffee", status: "safe", category: "Drinks", note: "Black coffee or with lactose-free milk. Can stimulate bowels (helpful for IBS-C)" },
  { name: "Tea", status: "safe", category: "Drinks", note: "Most teas are fine; avoid chamomile in large amounts" },
  { name: "Green tea", status: "safe", category: "Drinks" },
  { name: "Peppermint tea", status: "safe", category: "Drinks", note: "Can help with bloating" },
  { name: "Ginger tea", status: "safe", category: "Drinks", note: "Great for digestion" },
  { name: "Cranberry juice", status: "safe", category: "Drinks" },
  { name: "Orange juice", status: "safe", category: "Drinks", note: "Small glass (1/2 cup)" },
  { name: "Apple juice", status: "avoid", category: "Drinks", fodmapType: "Fructose & Sorbitol" },
  { name: "Pear juice", status: "avoid", category: "Drinks", fodmapType: "Fructose & Sorbitol" },
  { name: "Mango juice", status: "avoid", category: "Drinks", fodmapType: "Fructose" },
  { name: "Coconut water", status: "caution", category: "Drinks", note: "Small amounts OK; large amounts high in polyols" },
  { name: "Beer", status: "caution", category: "Drinks", note: "Regular beer contains wheat. Gluten-free beer is safer" },
  { name: "Wine", status: "safe", category: "Drinks", note: "Dry wine (1 glass) is low FODMAP" },
  { name: "Rum", status: "safe", category: "Drinks" },
  { name: "Vodka", status: "safe", category: "Drinks" },
  { name: "Gin", status: "safe", category: "Drinks" },
  { name: "Whiskey", status: "safe", category: "Drinks" },
  { name: "Kombucha", status: "caution", category: "Drinks", note: "Often high in fructose; check ingredients" },
  { name: "Chamomile tea", status: "caution", category: "Drinks", note: "Strong/concentrated chamomile can be high FODMAP" },
  { name: "Soda", status: "caution", category: "Drinks", note: "Avoid if made with HFCS. Diet sodas with artificial sweeteners are OK" },

  // ===== CONDIMENTS & SPICES =====
  { name: "Soy sauce", status: "safe", category: "Condiments & Spices" },
  { name: "Tamari", status: "safe", category: "Condiments & Spices" },
  { name: "Fish sauce", status: "safe", category: "Condiments & Spices" },
  { name: "Vinegar", status: "safe", category: "Condiments & Spices" },
  { name: "Apple cider vinegar", status: "safe", category: "Condiments & Spices" },
  { name: "Balsamic vinegar", status: "safe", category: "Condiments & Spices", note: "Small amounts (1 tbsp)" },
  { name: "Mustard", status: "safe", category: "Condiments & Spices" },
  { name: "Mayonnaise", status: "safe", category: "Condiments & Spices", note: "Check for garlic/onion in ingredients" },
  { name: "Salt", status: "safe", category: "Condiments & Spices" },
  { name: "Pepper", status: "safe", category: "Condiments & Spices" },
  { name: "Turmeric", status: "safe", category: "Condiments & Spices" },
  { name: "Cumin", status: "safe", category: "Condiments & Spices" },
  { name: "Paprika", status: "safe", category: "Condiments & Spices" },
  { name: "Cinnamon", status: "safe", category: "Condiments & Spices" },
  { name: "Oregano", status: "safe", category: "Condiments & Spices" },
  { name: "Basil", status: "safe", category: "Condiments & Spices" },
  { name: "Rosemary", status: "safe", category: "Condiments & Spices" },
  { name: "Thyme", status: "safe", category: "Condiments & Spices" },
  { name: "Lemongrass", status: "safe", category: "Condiments & Spices" },
  { name: "Psyllium husk", status: "safe", category: "Condiments & Spices", note: "Great for constipation! Start with 1/2 tsp/day, increase slowly" },
  { name: "Ketchup", status: "caution", category: "Condiments & Spices", note: "Often contains HFCS and onion/garlic. Check label" },
  { name: "BBQ sauce", status: "avoid", category: "Condiments & Spices", note: "Usually contains garlic, onion, honey, and HFCS" },
  { name: "Garlic powder", status: "avoid", category: "Condiments & Spices", fodmapType: "Fructans" },
  { name: "Onion powder", status: "avoid", category: "Condiments & Spices", fodmapType: "Fructans" },
  { name: "Pasta sauce", status: "caution", category: "Condiments & Spices", note: "Most contain garlic and onion. Make your own or find FODMAP-friendly brands" },
  { name: "Tomato sauce", status: "caution", category: "Condiments & Spices", note: "Plain tomato sauce is fine; check for added garlic and onion" },
  { name: "Salsa", status: "caution", category: "Condiments & Spices", note: "Usually contains onion and garlic" },

  // ===== SWEETS & DESSERTS =====
  { name: "Rice pudding", status: "safe", category: "Sweets & Desserts", note: "Make with lactose-free milk" },
  { name: "Macarons", status: "safe", category: "Sweets & Desserts", note: "Almond-based, naturally GF" },
  { name: "Sorbet", status: "caution", category: "Sweets & Desserts", note: "Depends on fruit used - lemon/orange sorbet is safer" },
  { name: "Cake", status: "avoid", category: "Sweets & Desserts", note: "Regular cake contains wheat and often lactose. Try GF recipes with maple syrup" },
  { name: "Cookies", status: "avoid", category: "Sweets & Desserts", note: "Regular cookies contain wheat. Try GF oat cookies" },
  { name: "Brownies", status: "avoid", category: "Sweets & Desserts", note: "Regular brownies contain wheat. Try GF versions" },
  { name: "Candy", status: "caution", category: "Sweets & Desserts", note: "Avoid sugar-free candy. Regular candy made with sugar is generally OK" },
  { name: "Gummy bears", status: "caution", category: "Sweets & Desserts", note: "Regular ones are OK; sugar-free ones contain polyols - avoid!" },
  { name: "Jam", status: "caution", category: "Sweets & Desserts", note: "Strawberry jam is safer. Avoid apple/pear/mango jams" },
  { name: "Peanut butter cups", status: "caution", category: "Sweets & Desserts", note: "Check for HFCS and milk ingredients" },

  // ===== FIBER & SUPPLEMENTS =====
  { name: "Psyllium", status: "safe", category: "Fiber & Supplements", note: "Best fiber for IBS-C. Start 1/2 tsp/day, work up slowly" },
  { name: "Chia seeds supplement", status: "safe", category: "Fiber & Supplements", note: "1 tbsp/day, good for constipation" },
  { name: "Inulin", status: "avoid", category: "Fiber & Supplements", fodmapType: "Fructans", note: "Common in 'fiber' supplements and protein bars" },
  { name: "Chicory root", status: "avoid", category: "Fiber & Supplements", fodmapType: "Fructans", note: "Often added to processed foods as fiber" },
  { name: "FOS", status: "avoid", category: "Fiber & Supplements", fodmapType: "Fructans", note: "Fructooligosaccharides - found in many supplements" },
  { name: "Fiber supplement", status: "caution", category: "Fiber & Supplements", note: "Many contain inulin/FOS which worsen bloating. Use psyllium instead" },
];

export function searchFoods(query: string): Food[] {
  const normalizedQuery = query.toLowerCase().trim();
  if (!normalizedQuery) return [];

  return foods.filter((food) => {
    const name = food.name.toLowerCase();
    // Exact match gets priority but we return all matches
    return name.includes(normalizedQuery) || normalizedQuery.includes(name);
  }).sort((a, b) => {
    const aName = a.name.toLowerCase();
    const bName = b.name.toLowerCase();
    const aExact = aName === normalizedQuery;
    const bExact = bName === normalizedQuery;
    const aStarts = aName.startsWith(normalizedQuery);
    const bStarts = bName.startsWith(normalizedQuery);

    if (aExact && !bExact) return -1;
    if (!aExact && bExact) return 1;
    if (aStarts && !bStarts) return -1;
    if (!aStarts && bStarts) return 1;
    return a.name.length - b.name.length;
  });
}

// Deduplicate results (e.g., "Strawberry" and "Strawberries" -> keep shortest)
export function deduplicateResults(results: Food[]): Food[] {
  const seen = new Map<string, Food>();
  for (const food of results) {
    const key = `${food.name.toLowerCase().replace(/s$/, '').replace(/ies$/, 'y')}-${food.status}`;
    if (!seen.has(key) || food.name.length < seen.get(key)!.name.length) {
      seen.set(key, food);
    }
  }
  return Array.from(seen.values());
}
