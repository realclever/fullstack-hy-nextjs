import Link from 'next/link';
import { getUsers } from '../services/users';

export const dynamic = 'force-dynamic';

const Users = async () => {
  const users = await getUsers();

  return (
    <section>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Users list
        </h1>
        <p className="mt-2 text-slate-600">View all registered users.</p>
      </div>
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="grid grid-cols-[1.2fr_1fr_auto] items-center gap-4 border-b border-slate-200 bg-slate-50 px-5 py-3 text-sm font-semibold text-slate-600">
          <span>Name</span>
          <span>Username</span>
          <span className="text-right">Blogs</span>
        </div>
        <ul>
          {users.map((user) => (
            <li
              key={user.id}
              className="border-b border-slate-100 last:border-b-0"
            >
              <Link
                href={`/users/${user.username}`}
                className="group grid grid-cols-[1.2fr_1fr_auto] items-center gap-4 px-5 py-4 transition hover:bg-slate-50"
              >
                <span className="font-semibold text-slate-900 transition group-hover:text-slate-600">
                  {user.name}
                </span>
                <span className="text-slate-500">@{user.username}</span>
                <span className="flex justify-end">
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600">
                    {user.blogs.length}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Users;
