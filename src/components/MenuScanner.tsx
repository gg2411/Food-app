"use client";

import { useState, useRef, useCallback } from "react";
import { getStoredApiKey } from "./ApiKeyModal";

interface AnalysisItem {
  name: string;
  status: "safe" | "avoid" | "caution";
  reason: string;
  tip?: string;
}

interface AnalysisResult {
  items?: AnalysisItem[];
  summary?: string;
  raw?: string;
}

export default function MenuScanner() {
  const [preview, setPreview] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const compressImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const maxDim = 1600;
          let { width, height } = img;

          if (width > maxDim || height > maxDim) {
            if (width > height) {
              height = (height / width) * maxDim;
              width = maxDim;
            } else {
              width = (width / height) * maxDim;
              height = maxDim;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          if (!ctx) return reject(new Error("Cannot get canvas context"));
          ctx.drawImage(img, 0, 0, width, height);

          // Convert to JPEG base64
          const dataUrl = canvas.toDataURL("image/jpeg", 0.85);
          const base64 = dataUrl.split(",")[1];
          resolve(base64);
        };
        img.onerror = () => reject(new Error("Failed to load image"));
        img.src = e.target?.result as string;
      };
      reader.onerror = () => reject(new Error("Failed to read file"));
      reader.readAsDataURL(file);
    });
  };

  const handleFileSelect = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      if (!file.type.startsWith("image/")) {
        setError("Please select an image file.");
        return;
      }

      if (file.size > 20 * 1024 * 1024) {
        setError("Image is too large. Please use an image under 20MB.");
        return;
      }

      setError("");
      setAnalysis(null);

      // Show preview
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);

      // Check for API key
      const apiKey = getStoredApiKey();
      if (!apiKey) {
        setError(
          "Please add your OpenAI API key in Settings first. Menu analysis requires the GPT-4 Vision API."
        );
        return;
      }

      setLoading(true);

      try {
        const base64 = await compressImage(file);

        const res = await fetch("/api/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            apiKey,
            mode: "menu",
            imageBase64: base64,
            content: "",
          }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error);

        setAnalysis(data.result);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to analyze menu"
        );
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const reset = () => {
    setPreview(null);
    setAnalysis(null);
    setError("");
    setLoading(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const statusColor = {
    safe: "bg-emerald-100 text-emerald-800 border-emerald-300",
    avoid: "bg-red-100 text-red-800 border-red-300",
    caution: "bg-amber-100 text-amber-800 border-amber-300",
  };

  const statusIcon = {
    safe: "\u2705",
    avoid: "\u274C",
    caution: "\u26A0\uFE0F",
  };

  const statusLabel = {
    safe: "Safe to eat",
    avoid: "Avoid",
    caution: "Use caution",
  };

  return (
    <div className="space-y-4">
      {/* Upload area */}
      {!preview && (
        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleFileSelect}
            className="hidden"
            id="menu-photo"
          />

          <label
            htmlFor="menu-photo"
            className="flex flex-col items-center justify-center aspect-[4/3] bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:bg-gray-100 hover:border-indigo-300 transition-colors p-6"
          >
            <svg
              className="w-16 h-16 text-gray-400 mb-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"
              />
            </svg>
            <p className="text-gray-600 font-medium text-center">
              Take a photo or upload a menu
            </p>
            <p className="text-gray-400 text-sm mt-1 text-center">
              AI will identify dishes and check FODMAP safety
            </p>
          </label>
        </div>
      )}

      {/* Image preview */}
      {preview && (
        <div className="relative rounded-xl overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={preview}
            alt="Menu photo"
            className="w-full rounded-xl"
          />
          {loading && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-xl">
              <div className="bg-white rounded-xl px-6 py-4 flex items-center gap-3">
                <div className="w-5 h-5 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                <p className="text-sm font-medium text-gray-700">
                  Analyzing menu...
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Analysis results */}
      {analysis && (
        <div className="space-y-3">
          {analysis.summary && (
            <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4">
              <p className="text-sm font-medium text-indigo-800">
                {analysis.summary}
              </p>
            </div>
          )}

          {analysis.items && analysis.items.length > 0 && (
            <div className="space-y-2">
              {/* Summary counts */}
              <div className="flex gap-2 text-xs">
                {(["safe", "caution", "avoid"] as const).map((s) => {
                  const count = analysis.items!.filter(
                    (i) => i.status === s
                  ).length;
                  if (count === 0) return null;
                  return (
                    <span
                      key={s}
                      className={`px-2 py-1 rounded-full border ${statusColor[s]}`}
                    >
                      {statusIcon[s]} {count} {statusLabel[s]}
                    </span>
                  );
                })}
              </div>

              {/* Individual items */}
              {analysis.items.map((item, i) => (
                <div
                  key={i}
                  className={`rounded-xl border p-3 ${statusColor[item.status]}`}
                >
                  <div className="flex items-start gap-2">
                    <span className="text-lg leading-none mt-0.5">
                      {statusIcon[item.status]}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-sm">{item.name}</p>
                      </div>
                      <p className="text-xs mt-0.5 opacity-80">{item.reason}</p>
                      {item.tip && (
                        <p className="text-xs mt-1.5 font-medium bg-white/50 rounded-lg px-2 py-1">
                          {item.tip}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {analysis.raw && !analysis.items && (
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-sm text-gray-700 whitespace-pre-wrap">
                {analysis.raw}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {/* Reset */}
      {preview && !loading && (
        <button
          onClick={reset}
          className="w-full py-2.5 rounded-xl border border-gray-300 text-gray-600 font-medium text-sm hover:bg-gray-50 transition-colors"
        >
          Scan Another Menu
        </button>
      )}

      {/* Info box */}
      {!preview && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
          <p className="text-sm text-amber-800">
            <strong>How it works:</strong> Take a clear photo of a restaurant
            menu. The AI will read each dish, identify likely ingredients, and
            tell you which items are safe, risky, or should be avoided on the
            low-FODMAP diet. It&apos;ll also suggest modifications you can ask
            for.
          </p>
        </div>
      )}
    </div>
  );
}
