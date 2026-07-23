import Link from 'next/link';
import { getUsers } from '../services/users';

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
        <div className="grid grid-cols-[1fr_1fr] border-b border-slate-200 bg-slate-50 px-5 py-3 text-sm font-semibold text-slate-600">
          <span>Name</span>
          <span>Username</span>
        </div>
        <ul>
          {users.map((user) => (
            <li
              key={user.id}
              className="grid grid-cols-[1fr_1fr] items-center border-b border-slate-100 px-5 py-4 last:border-b-0"
            >
              <Link
                href={`/users/${user.username}`}
                className="font-semibold text-slate-900 transition hover:text-slate-600"
              >
                {user.name}
              </Link>
              <span className="text-slate-500">{user.username}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Users;
