import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Study Planner",
  description: "A task and assignment manager",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-950 text-slate-200">
        <nav className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
          <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 sm:px-10">
            <div className="flex items-center gap-6">
              <Link href="/" className="text-xl font-bold text-white hover:text-indigo-400 transition-colors flex items-center gap-2">
                <svg className="w-6 h-6 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
                Study Planner
              </Link>
              <div className="hidden sm:flex items-center gap-6 ml-8">
                <Link href="/" className="text-sm font-semibold text-slate-400 hover:text-white transition-colors">Home</Link>
                <Link href="/tasks" className="text-sm font-semibold text-slate-400 hover:text-white transition-colors">Tasks</Link>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Link href="/tasks/new" className="px-5 py-2.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl transition-all shadow-[0_0_15px_rgba(79,70,229,0.3)] hover:shadow-[0_0_25px_rgba(79,70,229,0.5)] flex items-center space-x-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4"></path></svg>
                <span className="hidden sm:inline">New Task</span>
              </Link>
            </div>
          </div>
          <div className="sm:hidden border-t border-slate-800/80 px-6 py-3 flex gap-6 bg-slate-950">
            <Link href="/" className="text-sm font-semibold text-slate-400 hover:text-white transition-colors">Home</Link>
            <Link href="/tasks" className="text-sm font-semibold text-slate-400 hover:text-white transition-colors">Tasks</Link>
          </div>
        </nav>
        <main className="flex-grow flex flex-col">{children}</main>
      </body>
    </html>
  );
}
