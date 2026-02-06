"use client";

import { useState, useRef, useEffect } from "react";
import { searchFoods, type Food } from "@/data/foods";

function StatusBadge({ status }: { status: Food["status"] }) {
  if (status === "safe") {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
        <span className="w-2 h-2 rounded-full bg-emerald-500" />
        YES - Safe to eat
      </span>
    );
  }
  if (status === "avoid") {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-semibold bg-red-100 text-red-800 border border-red-200">
        <span className="w-2 h-2 rounded-full bg-red-500" />
        NO - Avoid this
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-semibold bg-amber-100 text-amber-800 border border-amber-200">
      <span className="w-2 h-2 rounded-full bg-amber-500" />
      CAUTION - Check details
    </span>
  );
}

function ResultCard({ food }: { food: Food }) {
  const borderColor =
    food.status === "safe"
      ? "border-emerald-200 bg-emerald-50/50"
      : food.status === "avoid"
      ? "border-red-200 bg-red-50/50"
      : "border-amber-200 bg-amber-50/50";

  return (
    <div className={`p-4 rounded-xl border-2 ${borderColor} transition-all`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
        <h3 className="text-lg font-bold text-gray-900">{food.name}</h3>
        <StatusBadge status={food.status} />
      </div>
      <div className="flex flex-wrap gap-2 mt-2">
        <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 border border-gray-200">
          {food.category}
        </span>
        {food.fodmapType && (
          <span className="text-xs px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 border border-purple-200">
            FODMAP: {food.fodmapType}
          </span>
        )}
      </div>
      {food.note && (
        <p className="mt-2 text-sm text-gray-600 leading-relaxed">
          <span className="font-medium">Tip:</span> {food.note}
        </p>
      )}
    </div>
  );
}

export default function FoodSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Food[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (query.trim().length === 0) {
      setResults([]);
      setHasSearched(false);
      return;
    }

    setHasSearched(true);
    const found = searchFoods(query);
    setResults(found);
  }, [query]);

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Search input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <svg
            className="h-5 w-5 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </div>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type a food... (e.g. garlic, rice, apple)"
          className="w-full pl-12 pr-4 py-4 text-lg rounded-2xl border-2 border-gray-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 outline-none transition-all bg-white shadow-sm text-gray-900 placeholder:text-gray-400"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Results */}
      <div className="mt-4 space-y-3">
        {hasSearched && results.length === 0 && (
          <div className="text-center py-8 px-4">
            <p className="text-gray-500 text-lg">
              No results for &quot;{query}&quot;
            </p>
            <p className="text-gray-400 text-sm mt-1">
              Try a different spelling or a simpler term
            </p>
          </div>
        )}
        {results.map((food, i) => (
          <ResultCard key={`${food.name}-${i}`} food={food} />
        ))}
      </div>
    </div>
  );
}
