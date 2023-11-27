import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/common/navbar";


export const metadata: Metadata = {
  title: "Banking App",
  description: "Banking App",
};

import React from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
          <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <Navbar />
            {children}
          </main>
      </body>
    </html>
  );
}
