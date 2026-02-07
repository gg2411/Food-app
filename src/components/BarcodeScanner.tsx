"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { getStoredApiKey } from "./ApiKeyModal";
import {
  analyzeIngredients,
  type LocalVerdict,
} from "@/lib/analyze-ingredients";

interface ProductInfo {
  name: string;
  brand: string;
  ingredients: string;
  image: string | null;
}

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

const SCANNER_ID = "barcode-scanner-region";

export default function BarcodeScanner() {
  const [scanning, setScanning] = useState(false);
  const [manualCode, setManualCode] = useState("");
  const [product, setProduct] = useState<ProductInfo | null>(null);
  const [verdict, setVerdict] = useState<LocalVerdict | null>(null);
  const [aiAnalysis, setAiAnalysis] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [error, setError] = useState("");
  const [step, setStep] = useState<"scan" | "result">("scan");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const scannerRef = useRef<any>(null);
  const foundRef = useRef(false);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      stopScannerOnly();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const stopScannerOnly = async () => {
    try {
      if (scannerRef.current) {
        const scanner = scannerRef.current;
        scannerRef.current = null;
        const state = scanner.getState?.();
        if (state === 2 || state === 3) {
          await scanner.stop();
        }
        scanner.clear?.();
      }
    } catch {
      // Ignore cleanup errors
    }
  };

  const stopCamera = useCallback(async () => {
    await stopScannerOnly();
    if (mountedRef.current) {
      setScanning(false);
    }
  }, []);

  const lookupBarcode = useCallback(async (code: string) => {
    setLoading(true);
    setError("");
    setProduct(null);
    setVerdict(null);
    setAiAnalysis(null);

    try {
      const res = await fetch(`/api/barcode?code=${encodeURIComponent(code)}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Product not found");
      }

      const prod = data.product as ProductInfo;
      setProduct(prod);

      // Instant local FODMAP analysis
      if (prod.ingredients) {
        const localVerdict = analyzeIngredients(prod.ingredients);
        setVerdict(localVerdict);
      } else {
        setVerdict({
          canEat: "caution",
          flags: [],
          summary:
            "No ingredients listed for this product. Check the label manually.",
        });
      }

      setStep("result");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to look up barcode"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  const analyzeWithAI = async () => {
    if (!product) return;
    const apiKey = getStoredApiKey();
    if (!apiKey) return;

    setAiLoading(true);
    try {
      const content = `Product: ${product.name}\nBrand: ${product.brand}\nIngredients: ${product.ingredients}`;

      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          apiKey,
          mode: "barcode",
          content,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setAiAnalysis(data.result);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to analyze product"
      );
    } finally {
      setAiLoading(false);
    }
  };

  const startCamera = useCallback(async () => {
    setError("");
    foundRef.current = false;

    // Show scanner area first so the div is visible
    setScanning(true);

    // Wait for React to render
    await new Promise((r) => setTimeout(r, 150));

    const el = document.getElementById(SCANNER_ID);
    if (!el) {
      setScanning(false);
      setError("Could not initialize scanner. Try entering the barcode manually.");
      return;
    }

    try {
      const { Html5Qrcode } = await import("html5-qrcode");

      const html5Qrcode = new Html5Qrcode(SCANNER_ID, {
        verbose: false,
        formatsToSupport: [
          0, 2, 3, 4, 5, 8, 9, 11, 15, 16,
        ],
      });
      scannerRef.current = html5Qrcode;

      await html5Qrcode.start(
        { facingMode: "environment" },
        {
          fps: 10,
          qrbox: { width: 250, height: 150 },
          aspectRatio: 1.333,
        },
        (decodedText: string) => {
          if (foundRef.current) return;
          foundRef.current = true;

          stopScannerOnly().then(() => {
            if (mountedRef.current) {
              setScanning(false);
              lookupBarcode(decodedText);
            }
          });
        },
        () => {}
      );
    } catch (err) {
      if (mountedRef.current) setScanning(false);
      const msg = err instanceof Error ? err.message : String(err);

      if (msg.includes("NotAllowedError") || msg.includes("Permission")) {
        setError("Camera access denied. Allow camera in browser settings and try again.");
      } else if (msg.includes("NotFoundError")) {
        setError("No camera found on this device.");
      } else if (msg.includes("NotReadableError") || msg.includes("TrackStartError")) {
        setError("Camera is in use by another app. Close other apps and try again.");
      } else {
        setError(`Could not start camera. Enter the barcode manually below.`);
      }
    }
  }, [lookupBarcode]);

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = manualCode.trim();
    if (/^\d{8,14}$/.test(code)) {
      lookupBarcode(code);
    } else {
      setError("Please enter a valid barcode (8-14 digits)");
    }
  };

  const reset = useCallback(async () => {
    await stopCamera();
    setProduct(null);
    setVerdict(null);
    setAiAnalysis(null);
    setError("");
    setManualCode("");
    setStep("scan");
  }, [stopCamera]);

  const verdictStyles = {
    yes: {
      bg: "bg-emerald-50 border-emerald-300",
      text: "text-emerald-800",
      icon: "\u2705",
      label: "YES - Safe to eat",
    },
    no: {
      bg: "bg-red-50 border-red-300",
      text: "text-red-800",
      icon: "\u274C",
      label: "NO - Avoid this",
    },
    caution: {
      bg: "bg-amber-50 border-amber-300",
      text: "text-amber-800",
      icon: "\u26A0\uFE0F",
      label: "CAUTION - Check details",
    },
  };

  return (
    <div className="space-y-4">
      {/* Scanner view */}
      {step === "scan" && (
        <div className="space-y-4">
          <div className="relative rounded-xl overflow-hidden bg-gray-900">
            <div
              id={SCANNER_ID}
              style={{
                display: scanning ? "block" : "none",
                width: "100%",
                minHeight: scanning ? "300px" : "0",
              }}
            />

            {scanning && (
              <button
                onClick={stopCamera}
                className="absolute top-3 right-3 z-10 bg-black/60 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-black/80 transition-colors"
              >
                Stop Camera
              </button>
            )}

            {!scanning && (
              <div className="flex flex-col items-center justify-center aspect-[4/3] text-gray-400 space-y-3 p-6">
                <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 6.75h.75v.75h-.75v-.75zM6.75 16.5h.75v.75h-.75v-.75zM16.5 6.75h.75v.75H16.5v-.75zM13.5 13.5h.75v.75h-.75v-.75zM13.5 19.5h.75v.75h-.75v-.75zM19.5 13.5h.75v.75h-.75v-.75zM19.5 19.5h.75v.75h-.75v-.75zM16.5 16.5h.75v.75H16.5v-.75z" />
                </svg>
                <p className="text-center text-sm">Point your camera at a product barcode</p>
                <button
                  onClick={startCamera}
                  className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-medium hover:bg-indigo-700 transition-colors"
                >
                  Start Camera
                </button>
              </div>
            )}
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-3 text-sm text-gray-400">or enter barcode manually</span>
            </div>
          </div>

          <form onSubmit={handleManualSubmit} className="flex gap-2">
            <input
              type="text"
              value={manualCode}
              onChange={(e) => { setManualCode(e.target.value.replace(/\D/g, "")); setError(""); }}
              placeholder="Enter barcode number..."
              className="flex-1 px-4 py-2.5 rounded-xl border border-gray-300 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none text-sm"
              maxLength={14}
              inputMode="numeric"
              pattern="\d*"
            />
            <button
              type="submit"
              disabled={!manualCode.trim()}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-medium text-sm hover:bg-indigo-700 disabled:bg-gray-200 disabled:text-gray-400 transition-colors"
            >
              Look Up
            </button>
          </form>
        </div>
      )}

      {/* Results */}
      {step === "result" && product && (
        <div className="space-y-3">
          {/* Big verdict banner */}
          {verdict && (
            <div className={`rounded-2xl border-2 p-5 text-center ${verdictStyles[verdict.canEat].bg}`}>
              <div className="text-4xl mb-2">{verdictStyles[verdict.canEat].icon}</div>
              <h3 className={`text-xl font-extrabold ${verdictStyles[verdict.canEat].text}`}>
                {verdictStyles[verdict.canEat].label}
              </h3>
              <p className={`text-sm mt-2 ${verdictStyles[verdict.canEat].text} opacity-80`}>
                {verdict.summary}
              </p>
            </div>
          )}

          {/* Product card */}
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-start gap-3">
              {product.image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-14 h-14 rounded-lg object-cover flex-shrink-0"
                />
              )}
              <div>
                <h4 className="font-bold text-gray-900 text-sm">{product.name}</h4>
                <p className="text-xs text-gray-500">{product.brand}</p>
              </div>
            </div>

            {product.ingredients && (
              <div className="bg-gray-50 rounded-lg p-3 mt-3">
                <p className="text-xs font-medium text-gray-500 mb-1">Ingredients</p>
                <p className="text-xs text-gray-600 leading-relaxed">{product.ingredients}</p>
              </div>
            )}
          </div>

          {/* Flagged ingredients */}
          {verdict && verdict.flags.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-gray-700">Flagged Ingredients</h4>
              {verdict.flags.map((flag, i) => (
                <div
                  key={i}
                  className={`rounded-xl border p-3 ${
                    flag.status === "avoid"
                      ? "bg-red-50 border-red-200 text-red-800"
                      : "bg-amber-50 border-amber-200 text-amber-800"
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <span className="text-base leading-none mt-0.5">
                      {flag.status === "avoid" ? "\u274C" : "\u26A0\uFE0F"}
                    </span>
                    <div>
                      <p className="font-semibold text-sm">{flag.ingredient}</p>
                      {flag.fodmapType && (
                        <span className="inline-block text-[10px] px-1.5 py-0.5 rounded-full bg-purple-100 text-purple-700 border border-purple-200 mt-0.5">
                          {flag.fodmapType}
                        </span>
                      )}
                      {flag.note && (
                        <p className="text-xs mt-1 opacity-80">{flag.note}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* AI analysis section */}
          {!aiAnalysis && !aiLoading && getStoredApiKey() && (
            <button
              onClick={analyzeWithAI}
              className="w-full py-2.5 rounded-xl bg-violet-600 text-white font-medium text-sm hover:bg-violet-700 transition-colors flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
              </svg>
              Get Deeper AI Analysis
            </button>
          )}

          {aiLoading && (
            <div className="flex items-center justify-center py-4 gap-3">
              <div className="w-4 h-4 border-2 border-violet-600 border-t-transparent rounded-full animate-spin" />
              <p className="text-sm text-gray-500">AI analyzing ingredients...</p>
            </div>
          )}

          {aiAnalysis && (
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-gray-700 flex items-center gap-1.5">
                <svg className="w-4 h-4 text-violet-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                </svg>
                AI Analysis
              </h4>
              {aiAnalysis.summary && (
                <div className="bg-violet-50 border border-violet-200 rounded-xl p-3">
                  <p className="text-sm text-violet-800">{aiAnalysis.summary}</p>
                </div>
              )}
              {aiAnalysis.items?.map((item, i) => (
                <div
                  key={i}
                  className={`rounded-xl border p-3 ${
                    item.status === "safe"
                      ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                      : item.status === "avoid"
                      ? "bg-red-50 border-red-200 text-red-800"
                      : "bg-amber-50 border-amber-200 text-amber-800"
                  }`}
                >
                  <p className="font-semibold text-sm">{item.name}</p>
                  <p className="text-xs mt-0.5 opacity-80">{item.reason}</p>
                  {item.tip && <p className="text-xs mt-1 font-medium">Tip: {item.tip}</p>}
                </div>
              ))}
              {aiAnalysis.raw && !aiAnalysis.items && (
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-sm text-gray-700 whitespace-pre-wrap">{aiAnalysis.raw}</p>
                </div>
              )}
            </div>
          )}

          {/* Reset */}
          <button
            onClick={reset}
            className="w-full py-2.5 rounded-xl border border-gray-300 text-gray-600 font-medium text-sm hover:bg-gray-50 transition-colors"
          >
            Scan Another Product
          </button>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="flex items-center justify-center py-8 gap-3">
          <div className="w-5 h-5 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-gray-500">Looking up product...</p>
        </div>
      )}

      {/* Error - only show in scan step */}
      {error && step === "scan" && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}
    </div>
  );
}
