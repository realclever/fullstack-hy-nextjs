import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getUserWithBlogs } from '../../services/users';

const UserPage = async ({
  params,
}: {
  params: Promise<{ username: string }>;
}) => {
  const { username } = await params;
  const user = await getUserWithBlogs(username);

  if (!user) {
    notFound();
  }

  return (
    <section>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          {user.name}
        </h1>
        <p className="mt-2 text-slate-600">{user.username}</p>
      </div>
      <h2 className="mb-4 text-xl font-semibold text-slate-900">Blogs</h2>
      {user.blogs.length === 0 ? (
        <p className="text-slate-500">No blogs added yet.</p>
      ) : (
        <ul className="grid gap-4">
          {user.blogs.map((blog) => (
            <li
              key={blog.id}
              className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <Link
                href={`/blogs/${blog.id}`}
                className="font-semibold text-slate-900 transition hover:text-slate-600"
              >
                {blog.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default UserPage;
