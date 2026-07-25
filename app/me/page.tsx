import Link from 'next/link';
import { redirect } from 'next/navigation';
import { generateToken } from '../actions/users';
import { getCurrentUser } from '../services/session';
import { getUserWithReadingList } from '../services/users';

const MePage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect('/login');
  }

  const user = await getUserWithReadingList(currentUser.username);

  if (!user) {
    redirect('/login');
  }

  const initials = user.name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <section>
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          My profile
        </h1>
        <div className="mt-6 flex items-center gap-4">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-slate-100 text-lg font-bold text-slate-700">
            {initials}
          </div>
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              {user.name}
            </h2>
            <p className="mt-1 text-sm text-slate-500">@{user.username}</p>
          </div>
        </div>
      </div>
      <div className="mb-10">
        <h2 className="mb-4 text-xl font-semibold text-slate-900">
          Reading list
        </h2>
        {user.readingList.length === 0 ? (
          <div className="rounded-xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
            <p className="text-slate-500">No blogs in your reading list yet.</p>
          </div>
        ) : (
          <ul className="grid gap-4">
            {user.readingList.map((entry) => (
              <li key={entry.id}>
                <Link
                  href={`/blogs/${entry.blog.id}`}
                  className="block rounded-xl border border-slate-200 bg-white px-5 py-4 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
                >
                  <h3 className="font-semibold text-slate-900">
                    {entry.blog.title}
                  </h3>
                  <p className="mt-1 text-sm text-slate-600">
                    by {entry.blog.author}
                  </p>
                  <p className="mt-2 truncate text-sm text-blue-600">
                    {entry.blog.url}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
      <h2 className="mb-4 text-xl font-semibold text-slate-900">API token</h2>
      <div className="rounded-xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
        <p className="text-sm font-medium text-slate-600">Current token</p>
        {user.token ? (
          <code className="mt-2 block overflow-x-auto rounded-lg bg-slate-100 px-4 py-3 text-sm text-slate-700">
            {user.token}
          </code>
        ) : (
          <p className="mt-2 text-slate-500">
            No token has been generated yet.
          </p>
        )}
        <form action={generateToken} className="mt-5">
          <button
            type="submit"
            className="rounded-lg bg-slate-900 px-4 py-2 font-medium text-white transition hover:bg-slate-800"
          >
            Generate new token
          </button>
        </form>
      </div>
    </section>
  );
};

export default MePage;
