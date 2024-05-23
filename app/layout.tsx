import NavBar from "@/components/NavBar";
import { Toaster } from "@/components/ui/toaster"

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Social Media app",
  description: "Created by Vivek Sahani",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster />
        <NavBar />
        {children}
      </body>
    </html>
  );
}
