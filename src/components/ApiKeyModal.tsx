"use client";

import { useState, useEffect, useCallback } from "react";

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const KEY_STORAGE = "fodmap_openai_key";

export function getStoredApiKey(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(KEY_STORAGE);
}

export function hasApiKey(): boolean {
  return !!getStoredApiKey();
}

export default function ApiKeyModal({ isOpen, onClose }: ApiKeyModalProps) {
  const [key, setKey] = useState("");
  const [saved, setSaved] = useState(false);
  const [hasExisting, setHasExisting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const existing = getStoredApiKey();
      if (existing) {
        setKey(maskKey(existing));
        setHasExisting(true);
      } else {
        setKey("");
        setHasExisting(false);
      }
      setSaved(false);
    }
  }, [isOpen]);

  const maskKey = (k: string) => {
    if (k.length <= 8) return "••••••••";
    return k.slice(0, 4) + "••••••••" + k.slice(-4);
  };

  const handleSave = useCallback(() => {
    const trimmed = key.trim();
    if (!trimmed || trimmed.includes("••••")) return;

    if (!trimmed.startsWith("sk-")) {
      alert("Invalid API key. OpenAI keys start with 'sk-'");
      return;
    }

    localStorage.setItem(KEY_STORAGE, trimmed);
    setSaved(true);
    setHasExisting(true);
    setKey(maskKey(trimmed));

    setTimeout(() => {
      onClose();
    }, 800);
  }, [key, onClose]);

  const handleRemove = useCallback(() => {
    localStorage.removeItem(KEY_STORAGE);
    setKey("");
    setHasExisting(false);
    setSaved(false);
  }, []);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (hasExisting && key.includes("••••")) {
      setKey(val.replace(/•/g, ""));
      setHasExisting(false);
    } else {
      setKey(val);
    }
    setSaved(false);
  }, [hasExisting, key]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 space-y-5">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-900">OpenAI API Key</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl leading-none"
          >
            &times;
          </button>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 space-y-2">
          <p className="text-sm text-blue-800 font-medium">How your key is handled:</p>
          <ul className="text-xs text-blue-700 space-y-1">
            <li className="flex gap-1.5">
              <span>&#x1f512;</span>
              Stored only in your browser&apos;s localStorage
            </li>
            <li className="flex gap-1.5">
              <span>&#x1f6ab;</span>
              Never saved on any server or database
            </li>
            <li className="flex gap-1.5">
              <span>&#x2192;</span>
              Sent only to our API route, which forwards to OpenAI and discards it
            </li>
            <li className="flex gap-1.5">
              <span>&#x1f5d1;</span>
              You can remove it anytime with the button below
            </li>
          </ul>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            API Key
          </label>
          <input
            type="password"
            value={key}
            onChange={handleInputChange}
            onFocus={() => {
              if (hasExisting && key.includes("••••")) {
                setKey("");
                setHasExisting(false);
              }
            }}
            placeholder="sk-..."
            className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none text-sm font-mono"
            autoComplete="off"
            spellCheck={false}
          />
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleSave}
            disabled={!key.trim() || key.includes("••••")}
            className={`flex-1 py-2.5 rounded-xl font-medium text-sm transition-all ${
              saved
                ? "bg-emerald-500 text-white"
                : "bg-indigo-600 text-white hover:bg-indigo-700 disabled:bg-gray-200 disabled:text-gray-400"
            }`}
          >
            {saved ? "Saved!" : "Save Key"}
          </button>
          {hasExisting && (
            <button
              onClick={handleRemove}
              className="px-4 py-2.5 rounded-xl font-medium text-sm border border-red-200 text-red-600 hover:bg-red-50 transition-colors"
            >
              Remove
            </button>
          )}
        </div>

        <p className="text-xs text-gray-400 text-center">
          Need a key?{" "}
          <a
            href="https://platform.openai.com/api-keys"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-500 hover:underline"
          >
            Get one from OpenAI
          </a>
        </p>
      </div>
    </div>
  );
}
