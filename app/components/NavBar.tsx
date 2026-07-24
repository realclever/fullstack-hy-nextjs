'use client';

import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';

export default function NavBar() {
  const { data: session, status } = useSession();

  return (
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
            href="/users"
            className="text-slate-600 transition hover:text-slate-950"
          >
            Users
          </Link>
          {status !== 'loading' &&
            (session ? (
              <>
                <Link
                  href="/blogs/new"
                  className="text-slate-600 transition hover:text-slate-950"
                >
                  Create new
                </Link>
                <span className="text-slate-500">
                  Signed in as{' '}
                  <Link
                    href={`/users/${session.user?.email}`}
                    className="font-medium text-slate-700 transition hover:text-slate-950 hover:underline"
                  >
                    {session.user?.name}
                  </Link>
                </span>
                <button
                  type="button"
                  onClick={() => signOut()}
                  className="text-slate-600 transition hover:text-slate-950 hover:underline"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-slate-600 transition hover:text-slate-950"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="text-slate-600 transition hover:text-slate-950"
                >
                  Register
                </Link>
              </>
            ))}
        </div>
      </nav>
    </header>
  );
}
