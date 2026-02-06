import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FODMAP Food Checker - Can I Eat This?",
  description:
    "Check if a food is safe on the low-FODMAP diet. Instant search for IBS-friendly foods, bloating triggers, and constipation-safe options.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 min-h-screen font-sans">
        {children}
      </body>
    </html>
  );
}
