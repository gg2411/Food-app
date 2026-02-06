"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { getStoredApiKey } from "./ApiKeyModal";

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
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [step, setStep] = useState<"scan" | "product" | "analysis">("scan");
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const foundRef = useRef(false);

  const stopCamera = useCallback(async () => {
    try {
      if (scannerRef.current) {
        const state = scannerRef.current.getState();
        // 2 = SCANNING, 3 = PAUSED
        if (state === 2 || state === 3) {
          await scannerRef.current.stop();
        }
        scannerRef.current.clear();
        scannerRef.current = null;
      }
    } catch {
      // Ignore cleanup errors
    }
    setScanning(false);
  }, []);

  useEffect(() => {
    return () => {
      if (scannerRef.current) {
        try {
          const state = scannerRef.current.getState();
          if (state === 2 || state === 3) {
            scannerRef.current.stop();
          }
          scannerRef.current.clear();
        } catch {
          // Ignore
        }
      }
    };
  }, []);

  const lookupBarcode = useCallback(async (code: string) => {
    setLoading(true);
    setError("");
    setProduct(null);
    setAnalysis(null);

    try {
      const res = await fetch(`/api/barcode?code=${encodeURIComponent(code)}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Product not found");
      }

      setProduct(data.product);
      setStep("product");

      // Auto-analyze if API key is available
      const apiKey = getStoredApiKey();
      if (apiKey && data.product.ingredients) {
        await analyzeProduct(data.product, apiKey);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to look up barcode"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  const analyzeProduct = async (prod: ProductInfo, apiKey: string) => {
    setLoading(true);
    try {
      const content = `Product: ${prod.name}\nBrand: ${prod.brand}\nIngredients: ${prod.ingredients}`;

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

      setAnalysis(data.result);
      setStep("analysis");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to analyze product"
      );
    } finally {
      setLoading(false);
    }
  };

  const startCamera = async () => {
    setError("");
    foundRef.current = false;

    try {
      const html5Qrcode = new Html5Qrcode(SCANNER_ID);
      scannerRef.current = html5Qrcode;

      await html5Qrcode.start(
        { facingMode: "environment" },
        {
          fps: 10,
          qrbox: { width: 280, height: 160 },
          aspectRatio: 1.333,
        },
        (decodedText) => {
          // Prevent duplicate fires
          if (foundRef.current) return;
          foundRef.current = true;

          // Stop scanner and look up barcode
          stopCamera().then(() => {
            lookupBarcode(decodedText);
          });
        },
        () => {
          // Ignore scan failures (happens every frame without a barcode)
        }
      );

      setScanning(true);
    } catch (err) {
      if (err instanceof Error && err.message.includes("NotAllowedError")) {
        setError(
          "Camera access denied. Please allow camera access in your browser settings and try again."
        );
      } else {
        setError(
          "Could not access camera. Please make sure you allow camera permissions, or enter the barcode manually below."
        );
      }
    }
  };

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
    setAnalysis(null);
    setError("");
    setManualCode("");
    setStep("scan");
  }, [stopCamera]);

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

  return (
    <div className="space-y-4">
      {/* Scanner view */}
      {step === "scan" && (
        <div className="space-y-4">
          <div className="relative rounded-xl overflow-hidden bg-gray-900">
            {scanning ? (
              <div className="relative">
                <div id={SCANNER_ID} className="w-full" />
                <button
                  onClick={stopCamera}
                  className="absolute top-3 right-3 z-10 bg-black/50 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-black/70"
                >
                  Stop
                </button>
              </div>
            ) : (
              <>
                {/* Hidden div needed for Html5Qrcode to attach to */}
                <div id={SCANNER_ID} className="hidden" />
                <div className="flex flex-col items-center justify-center aspect-[4/3] text-gray-400 space-y-3 p-6">
                  <svg
                    className="w-16 h-16"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.75 6.75h.75v.75h-.75v-.75zM6.75 16.5h.75v.75h-.75v-.75zM16.5 6.75h.75v.75H16.5v-.75zM13.5 13.5h.75v.75h-.75v-.75zM13.5 19.5h.75v.75h-.75v-.75zM19.5 13.5h.75v.75h-.75v-.75zM19.5 19.5h.75v.75h-.75v-.75zM16.5 16.5h.75v.75H16.5v-.75z"
                    />
                  </svg>
                  <p className="text-center text-sm">
                    Point your camera at a product barcode
                  </p>
                  <button
                    onClick={startCamera}
                    className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-medium hover:bg-indigo-700 transition-colors"
                  >
                    Start Camera
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Manual barcode entry */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-3 text-sm text-gray-400">
                or enter barcode manually
              </span>
            </div>
          </div>

          <form onSubmit={handleManualSubmit} className="flex gap-2">
            <input
              type="text"
              value={manualCode}
              onChange={(e) => {
                setManualCode(e.target.value.replace(/\D/g, ""));
                setError("");
              }}
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

      {/* Product info */}
      {step !== "scan" && product && (
        <div className="bg-white rounded-xl border border-gray-200 p-4 space-y-3">
          <div className="flex items-start gap-3">
            {product.image && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={product.image}
                alt={product.name}
                className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
              />
            )}
            <div>
              <h4 className="font-bold text-gray-900">{product.name}</h4>
              <p className="text-sm text-gray-500">{product.brand}</p>
            </div>
          </div>

          {product.ingredients && (
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-xs font-medium text-gray-500 mb-1">
                Ingredients
              </p>
              <p className="text-sm text-gray-700 leading-relaxed">
                {product.ingredients}
              </p>
            </div>
          )}

          {!analysis && !loading && (
            <div className="space-y-2">
              {getStoredApiKey() ? (
                <button
                  onClick={() => analyzeProduct(product, getStoredApiKey()!)}
                  className="w-full py-2.5 rounded-xl bg-indigo-600 text-white font-medium text-sm hover:bg-indigo-700 transition-colors"
                >
                  Analyze with AI
                </button>
              ) : (
                <p className="text-sm text-gray-400 text-center py-2">
                  Add your OpenAI API key in settings to get AI analysis
                </p>
              )}
            </div>
          )}
        </div>
      )}

      {/* AI Analysis results */}
      {analysis && (
        <div className="space-y-3">
          {analysis.summary && (
            <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4">
              <p className="text-sm font-medium text-indigo-800">
                {analysis.summary}
              </p>
            </div>
          )}

          {analysis.items?.map((item, i) => (
            <div
              key={i}
              className={`rounded-xl border p-3 ${statusColor[item.status]}`}
            >
              <div className="flex items-start gap-2">
                <span className="text-lg">{statusIcon[item.status]}</span>
                <div>
                  <p className="font-semibold text-sm">{item.name}</p>
                  <p className="text-xs mt-0.5 opacity-80">{item.reason}</p>
                  {item.tip && (
                    <p className="text-xs mt-1 font-medium">
                      Tip: {item.tip}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}

          {analysis.raw && !analysis.items && (
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-sm text-gray-700 whitespace-pre-wrap">
                {analysis.raw}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="flex items-center justify-center py-8 gap-3">
          <div className="w-5 h-5 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-gray-500">
            {product ? "Analyzing ingredients..." : "Looking up product..."}
          </p>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {/* Reset button */}
      {step !== "scan" && (
        <button
          onClick={reset}
          className="w-full py-2.5 rounded-xl border border-gray-300 text-gray-600 font-medium text-sm hover:bg-gray-50 transition-colors"
        >
          Scan Another Product
        </button>
      )}
    </div>
  );
}
