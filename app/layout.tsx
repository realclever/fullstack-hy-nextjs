import type { Metadata } from 'next';
import Link from 'next/link';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Blog app',
  description: 'Full Stack Open Next.js blog application',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-screen bg-slate-100 text-slate-900">
        <header className="border-b border-slate-200 bg-white shadow-sm">
          <nav className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
            <Link
              href="/"
              className="text-xl font-bold tracking-tight text-slate-900 transition hover:text-slate-600"
            >
              Blog app
            </Link>

            <div className="flex items-center gap-5 text-sm font-medium">
              <Link
                href="/blogs"
                className="text-slate-600 transition hover:text-slate-950"
              >
                Blogs
              </Link>
              <Link
                href="/blogs/new"
                className="text-slate-600 transition hover:text-slate-950"
              >
                Create new
              </Link>
            </div>
          </nav>
        </header>

        <main className="mx-auto w-full max-w-4xl px-6 py-10">{children}</main>
      </body>
    </html>
  );
}
