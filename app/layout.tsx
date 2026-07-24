import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import AuthSessionProvider from './components/SessionProvider';
import NavBar from './components/NavBar';
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
        <AuthSessionProvider>
          <NavBar />
          <main className="mx-auto w-full max-w-4xl px-6 py-10">
            {children}
          </main>
        </AuthSessionProvider>
      </body>
    </html>
  );
}
