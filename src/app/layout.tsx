import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Skills Library",
  description: "Reusable agent skills and tools for the team",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${geist.className} min-h-screen bg-background text-foreground antialiased`}>
        <header className="border-b border-border px-6 py-4">
          <div className="mx-auto max-w-6xl flex items-center justify-between">
            <div>
              <a href={process.env.NEXT_PUBLIC_BASE_PATH ?? "/"} className="text-xl font-bold tracking-tight">
                Skills Library
              </a>
              <span className="ml-3 text-sm text-muted-foreground">Agent Skills &amp; Tools</span>
            </div>
          </div>
        </header>
        <main className="mx-auto max-w-6xl px-6 py-10">{children}</main>
      </body>
    </html>
  );
}
