import ToolTabs from "@/components/ToolTabs";

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-20">
      <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
        {title}
      </h2>
      {children}
    </section>
  );
}

function FoodGrid({
  title,
  items,
  variant,
}: {
  title: string;
  items: string[];
  variant: "safe" | "avoid" | "caution";
}) {
  const colors = {
    safe: "bg-emerald-50 border-emerald-200 text-emerald-800",
    avoid: "bg-red-50 border-red-200 text-red-800",
    caution: "bg-amber-50 border-amber-200 text-amber-800",
  };
  const headerColors = {
    safe: "text-emerald-700",
    avoid: "text-red-700",
    caution: "text-amber-700",
  };

  return (
    <div>
      <h4 className={`font-semibold mb-2 ${headerColors[variant]}`}>{title}</h4>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={item}
            className={`px-3 py-1 rounded-full text-sm border ${colors[variant]}`}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      className="px-3 py-1.5 rounded-lg text-sm font-medium text-gray-600 hover:text-indigo-700 hover:bg-indigo-50 transition-colors"
    >
      {label}
    </a>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-1 overflow-x-auto">
          <a href="#search" className="font-bold text-indigo-600 mr-2 whitespace-nowrap text-sm">
            FODMAP Checker
          </a>
          <NavLink href="#what" label="What" />
          <NavLink href="#avoid" label="Avoid" />
          <NavLink href="#safe" label="Safe" />
          <NavLink href="#constipation" label="IBS-C" />
          <NavLink href="#sweets" label="Sweets" />
          <NavLink href="#sample" label="Meals" />
          <NavLink href="#reintro" label="Reintro" />
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-16">
        {/* Hero + Search */}
        <div id="search" className="text-center space-y-6 pt-4">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
            Can I Eat This?
          </h1>
          <p className="text-lg text-gray-500 max-w-xl mx-auto">
            Low-FODMAP food checker for bloating + constipation relief.
            <br />
            Search foods, scan barcodes, or photograph menus.
          </p>
          <ToolTabs />
        </div>

        {/* What is FODMAP */}
        <Section id="what" title="What the Low-FODMAP Diet Actually Does">
          <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
            <p className="text-gray-700 leading-relaxed">
              <strong>FODMAPs</strong> are carbohydrates that ferment in the gut, creating gas + water.
              This leads to <strong>bloating, pain, constipation</strong> (or diarrhea).
            </p>
            <p className="text-gray-700 leading-relaxed">
              The goal is to <strong>reduce fermentation</strong>, calm your gut, then reintroduce foods
              strategically. Think of this as a <strong>4-week reset</strong>, not a forever diet.
            </p>
            <div className="bg-indigo-50 rounded-xl p-4 border border-indigo-100">
              <p className="text-indigo-800 font-medium text-sm">
                FODMAP stands for: Fermentable Oligosaccharides, Disaccharides, Monosaccharides, and Polyols
              </p>
            </div>
          </div>
        </Section>

        {/* Step 1: Elimination - Avoid */}
        <Section id="avoid" title="Step 1: Elimination Phase (2-4 weeks) - Foods to Avoid">
          <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-6">
            <p className="text-gray-600">
              These are the biggest constipation + bloating triggers. Avoid completely during elimination.
            </p>

            <div className="space-y-6">
              <FoodGrid
                title="Vegetables"
                variant="avoid"
                items={[
                  "Onion",
                  "Garlic",
                  "Leeks",
                  "Shallots",
                  "Cauliflower",
                  "Mushrooms",
                  "Asparagus",
                  "Artichokes",
                ]}
              />
              <FoodGrid
                title="Fruit"
                variant="avoid"
                items={[
                  "Apples",
                  "Pears",
                  "Mango",
                  "Cherries",
                  "Peach",
                  "Plum",
                  "Nectarine",
                  "Watermelon",
                ]}
              />
              <FoodGrid
                title="Sweeteners"
                variant="avoid"
                items={[
                  "Honey",
                  "Agave",
                  "High-fructose corn syrup",
                  "Sorbitol",
                  "Xylitol",
                  "Erythritol",
                  "Maltitol",
                ]}
              />
              <FoodGrid
                title="Grains & Carbs"
                variant="avoid"
                items={["Wheat bread", "Wheat pasta", "Wraps", "Rye", "Couscous", "Barley"]}
              />
              <FoodGrid
                title="Dairy"
                variant="avoid"
                items={[
                  "Milk",
                  "Regular yogurt",
                  "Ice cream",
                  "Ricotta",
                  "Cottage cheese",
                  "Cream cheese",
                ]}
              />
              <FoodGrid
                title="Legumes"
                variant="avoid"
                items={["Lentils", "Chickpeas", "Black beans", "Kidney beans", "Baked beans"]}
              />
            </div>
          </div>
        </Section>

        {/* Step 1: Elimination - Safe */}
        <Section id="safe" title="Safe Foods You Can Eat">
          <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-6">
            <p className="text-gray-600">
              These are your go-to foods during the elimination phase. Build your meals around these.
            </p>

            <div className="space-y-6">
              <FoodGrid
                title="Vegetables (great for constipation)"
                variant="safe"
                items={[
                  "Zucchini",
                  "Carrots",
                  "Bell peppers",
                  "Spinach",
                  "Kale",
                  "Cucumber",
                  "Eggplant",
                  "Green beans",
                  "Lettuce",
                  "Tomato",
                  "Bok choy",
                ]}
              />
              <FoodGrid
                title="Fruits (max 1 serving per meal)"
                variant="safe"
                items={[
                  "Strawberries",
                  "Blueberries",
                  "Raspberries",
                  "Kiwi",
                  "Oranges",
                  "Pineapple",
                  "Banana (unripe)",
                  "Grapes",
                ]}
              />
              <FoodGrid
                title="Carbs & Grains"
                variant="safe"
                items={[
                  "White/brown rice",
                  "Quinoa",
                  "Gluten-free pasta",
                  "Oats (1/2 cup)",
                  "Rice cakes",
                  "Corn tortillas",
                  "Popcorn",
                ]}
              />
              <FoodGrid
                title="Protein"
                variant="safe"
                items={[
                  "Eggs",
                  "Fish",
                  "Shrimp",
                  "Tofu (firm)",
                  "Tempeh",
                  "Beef",
                  "Turkey",
                  "Lactose-free Greek yogurt",
                  "Parmesan",
                  "Cheddar",
                  "Feta",
                ]}
              />
              <FoodGrid
                title="Fats (gut-friendly)"
                variant="safe"
                items={[
                  "Olive oil",
                  "Butter",
                  "Avocado (1/4 max)",
                  "Walnuts",
                  "Peanut butter",
                  "Chia seeds",
                  "Pumpkin seeds",
                ]}
              />
            </div>
          </div>
        </Section>

        {/* Step 2: Constipation tweaks */}
        <Section id="constipation" title="Step 2: Constipation-Focused Tweaks (IBS-C)">
          <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-6">
            <p className="text-gray-600 font-medium">
              Low-FODMAP alone isn&apos;t enough for IBS-C. Do these daily:
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100">
                <h4 className="font-bold text-emerald-800 mb-2">Fiber (the right kind)</h4>
                <ul className="space-y-1 text-sm text-emerald-700">
                  <li>Kiwi - 1 to 2 per day</li>
                  <li>Chia seeds - 1 tbsp/day</li>
                  <li>Oats</li>
                  <li>Psyllium husk - 1/2 to 1 tsp/day, go slow</li>
                </ul>
              </div>
              <div className="bg-red-50 rounded-xl p-4 border border-red-100">
                <h4 className="font-bold text-red-800 mb-2">Avoid</h4>
                <p className="text-sm text-red-700">
                  Random fiber supplements - they often contain inulin/FOS and worsen bloating.
                </p>
              </div>
              <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                <h4 className="font-bold text-blue-800 mb-2">Water + Timing</h4>
                <ul className="space-y-1 text-sm text-blue-700">
                  <li>1 full glass of water first thing in the morning</li>
                  <li>Warm beverages help bowel movement reflex</li>
                </ul>
              </div>
              <div className="bg-violet-50 rounded-xl p-4 border border-violet-100">
                <h4 className="font-bold text-violet-800 mb-2">Movement</h4>
                <ul className="space-y-1 text-sm text-violet-700">
                  <li>Walking after meals - 10 to 15 min</li>
                  <li>Gentle twisting or yoga poses</li>
                </ul>
              </div>
            </div>
          </div>
        </Section>

        {/* Step 3: Sweets */}
        <Section id="sweets" title="Step 3: Sweets (Yes, You Can Have Them)">
          <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-6">
            <p className="text-gray-600">
              You don&apos;t need to give up sweets - just choose wisely.
            </p>

            <div className="space-y-6">
              <FoodGrid
                title="Safe Sweet Options"
                variant="safe"
                items={[
                  "Dark chocolate (70%+)",
                  "Maple syrup",
                  "White sugar",
                  "Coconut sugar",
                  "Lactose-free chocolate",
                  "Rice-based desserts",
                  "Oat + maple baked goods (homemade)",
                ]}
              />
              <FoodGrid
                title="Avoid"
                variant="avoid"
                items={[
                  "\"Sugar-free\" anything",
                  "Protein bars with polyols",
                  "Dates & date syrup",
                  "Honey-sweetened treats",
                ]}
              />
            </div>
          </div>
        </Section>

        {/* Step 4: Sample Day */}
        <Section id="sample" title="Step 4: Sample Day">
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-gray-800 mb-1">Breakfast</h4>
                  <ul className="text-sm text-gray-600 space-y-0.5">
                    <li>Lactose-free Greek yogurt</li>
                    <li>Blueberries + strawberries</li>
                    <li>Chia seeds</li>
                    <li>A little dark chocolate</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 mb-1">Lunch</h4>
                  <ul className="text-sm text-gray-600 space-y-0.5">
                    <li>Quinoa bowl</li>
                    <li>Roasted zucchini, carrots, bell peppers</li>
                    <li>Tofu or shrimp</li>
                    <li>Olive oil + lemon</li>
                  </ul>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-gray-800 mb-1">Snack</h4>
                  <ul className="text-sm text-gray-600 space-y-0.5">
                    <li>Kiwi + handful of walnuts</li>
                    <li>Rice cakes with peanut butter</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 mb-1">Dinner</h4>
                  <ul className="text-sm text-gray-600 space-y-0.5">
                    <li>Rice or gluten-free pasta</li>
                    <li>Eggplant + spinach</li>
                    <li>Eggs or fish</li>
                    <li>Garlic-infused olive oil (safe!)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 mb-1">Dessert</h4>
                  <ul className="text-sm text-gray-600 space-y-0.5">
                    <li>Dark chocolate</li>
                    <li>Maple-sweetened oats</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* Step 5: Reintroduction */}
        <Section id="reintro" title="Step 5: Reintroduction (Don't Skip This)">
          <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
            <p className="text-gray-700 leading-relaxed">
              Once symptoms improve (usually 10-21 days), test <strong>one category at a time</strong> to
              find out what your gut actually reacts to. This way you don&apos;t over-restrict forever.
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                { name: "Lactose", example: "Milk, yogurt" },
                { name: "Fructans (veggies)", example: "Garlic, onion" },
                { name: "Fructans (grains)", example: "Wheat bread, pasta" },
                { name: "GOS", example: "Beans, lentils" },
                { name: "Fructose", example: "Honey, apple" },
                { name: "Polyols", example: "Mushrooms, stone fruit" },
              ].map((group) => (
                <div
                  key={group.name}
                  className="bg-gray-50 rounded-xl p-3 border border-gray-200"
                >
                  <p className="font-semibold text-gray-800 text-sm">{group.name}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{group.example}</p>
                </div>
              ))}
            </div>

            <div className="bg-amber-50 rounded-xl p-4 border border-amber-100">
              <p className="text-amber-800 text-sm font-medium">
                Test each group for 3 days with increasing portions. If symptoms return, that group is a
                trigger for you. Wait until symptoms settle before testing the next group.
              </p>
            </div>
          </div>
        </Section>

        {/* Meds note */}
        <Section id="meds" title="When to Reassess Meds">
          <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-3">
            <ul className="space-y-2 text-gray-700 text-sm">
              <li className="flex gap-2">
                <span className="text-indigo-500 mt-0.5">&#8226;</span>
                FODMAP + pelvic floor dysfunction is common in IBS-C
              </li>
              <li className="flex gap-2">
                <span className="text-indigo-500 mt-0.5">&#8226;</span>
                Motility meds often fail without diet changes
              </li>
              <li className="flex gap-2">
                <span className="text-indigo-500 mt-0.5">&#8226;</span>
                Some people respond better to psyllium + diet than prescription meds
              </li>
            </ul>
          </div>
        </Section>

        {/* Footer */}
        <footer className="text-center text-sm text-gray-400 pb-8 pt-4 border-t border-gray-200">
          <p>
            This is a personal reference guide based on the Monash University Low-FODMAP diet.
            <br />
            Not medical advice. Always consult a dietitian for personalized guidance.
          </p>
        </footer>
      </div>
    </main>
  );
}
