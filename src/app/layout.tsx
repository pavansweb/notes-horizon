import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "katex/dist/katex.min.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navbar } from "@/components/layout/navbar";
import { Sidebar } from "@/components/layout/sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Notes Horizon | JEE Interactive Learning",
  description: "Next-generation interactive learning platform for JEE students.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#030303] text-white`}
      >
        <TooltipProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex flex-1 pt-20">
              <Sidebar />
              <main className="flex-1 md:pl-72 relative">
                {/* Global Background Glow */}
                <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[-1]">
                  <div className="absolute top-[-10%] left-[20%] w-[40%] h-[40%] bg-blue-600/5 blur-[120px] rounded-full" />
                  <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/5 blur-[120px] rounded-full" />
                </div>
                {children}
              </main>
            </div>
          </div>
        </TooltipProvider>
      </body>
    </html>
  );
}
