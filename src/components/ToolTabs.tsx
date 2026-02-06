"use client";

import { useState } from "react";
import FoodSearch from "./FoodSearch";
import BarcodeScanner from "./BarcodeScanner";
import MenuScanner from "./MenuScanner";
import ApiKeyModal from "./ApiKeyModal";

type Tab = "search" | "barcode" | "menu";

export default function ToolTabs() {
  const [activeTab, setActiveTab] = useState<Tab>("search");
  const [showSettings, setShowSettings] = useState(false);

  const tabs: { id: Tab; label: string; icon: React.ReactNode; description: string }[] = [
    {
      id: "search",
      label: "Search Food",
      description: "Type any food name",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
      ),
    },
    {
      id: "barcode",
      label: "Scan Barcode",
      description: "Supermarket products",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 6.75h.75v.75h-.75v-.75zM6.75 16.5h.75v.75h-.75v-.75zM16.5 6.75h.75v.75H16.5v-.75zM13.5 13.5h.75v.75h-.75v-.75zM13.5 19.5h.75v.75h-.75v-.75zM19.5 13.5h.75v.75h-.75v-.75zM19.5 19.5h.75v.75h-.75v-.75zM16.5 16.5h.75v.75H16.5v-.75z" />
        </svg>
      ),
    },
    {
      id: "menu",
      label: "Scan Menu",
      description: "Restaurant menus",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      {/* Tab buttons */}
      <div className="flex gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex flex-col items-center gap-1 px-3 py-3 rounded-xl border-2 transition-all text-center ${
              activeTab === tab.id
                ? "border-indigo-400 bg-indigo-50 text-indigo-700"
                : "border-gray-200 bg-white text-gray-500 hover:border-gray-300 hover:text-gray-700"
            }`}
          >
            {tab.icon}
            <span className="text-xs font-semibold">{tab.label}</span>
            <span className="text-[10px] opacity-70 hidden sm:block">{tab.description}</span>
          </button>
        ))}

        {/* Settings button */}
        <button
          onClick={() => setShowSettings(true)}
          className="flex flex-col items-center justify-center gap-1 px-3 py-3 rounded-xl border-2 border-gray-200 bg-white text-gray-500 hover:border-gray-300 hover:text-gray-700 transition-all"
          title="API Settings"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="text-xs font-semibold">Settings</span>
          <span className="text-[10px] opacity-70 hidden sm:block">API Key</span>
        </button>
      </div>

      {/* AI badge for barcode/menu */}
      {(activeTab === "barcode" || activeTab === "menu") && (
        <div className="flex items-center gap-2 bg-gradient-to-r from-violet-50 to-indigo-50 border border-violet-200 rounded-xl px-4 py-2.5">
          <div className="w-2 h-2 rounded-full bg-violet-500 animate-pulse" />
          <p className="text-xs text-violet-700">
            <strong>AI-Powered</strong> &mdash; Uses OpenAI to analyze ingredients and menu items.{" "}
            <button
              onClick={() => setShowSettings(true)}
              className="underline hover:text-violet-900"
            >
              Add your API key in Settings
            </button>{" "}
            to enable.
          </p>
        </div>
      )}

      {/* Tab content */}
      <div>
        {activeTab === "search" && <FoodSearch />}
        {activeTab === "barcode" && <BarcodeScanner />}
        {activeTab === "menu" && <MenuScanner />}
      </div>

      {/* API Key Modal */}
      <ApiKeyModal isOpen={showSettings} onClose={() => setShowSettings(false)} />
    </div>
  );
}
