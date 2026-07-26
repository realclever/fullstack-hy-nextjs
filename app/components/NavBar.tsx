'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { useNotification } from './NotificationContext';

export default function NavBar() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { showNotification } = useNotification();

  const handleLogout = async () => {
    const name = session?.user?.name ?? 'there';

    await signOut({ redirect: false });

    showNotification(`Bye, ${name}!`);
    router.push('/');
    router.refresh();
  };

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
          {status !== 'loading' && (
            <>
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
              {session ? (
                <>
                  <Link
                    href="/blogs/new"
                    className="text-slate-600 transition hover:text-slate-950"
                  >
                    Create new
                  </Link>
                  <Link
                    href="/me"
                    className="text-slate-600 transition hover:text-slate-950"
                  >
                    Me
                  </Link>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="cursor-pointer text-slate-600 transition hover:text-slate-950 hover:underline"
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
              )}
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
