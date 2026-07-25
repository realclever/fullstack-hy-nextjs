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
        <p className="mt-2 text-slate-600">@{user.username}</p>
      </div>
      <h2 className="mb-4 text-xl font-semibold text-slate-900">Blogs</h2>
      {user.blogs.length === 0 ? (
        <p className="text-slate-500">No blogs added yet.</p>
      ) : (
        <ul className="grid gap-4">
          {user.blogs.map((blog) => (
            <li key={blog.id}>
              <Link
                href={`/blogs/${blog.id}`}
                className="block rounded-xl border border-slate-200 bg-white px-5 py-4 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
              >
                <div className="flex items-start justify-between gap-6">
                  <div className="min-w-0">
                    <h3 className="font-semibold text-slate-900">
                      {blog.title}
                    </h3>
                    <p className="mt-1 truncate text-sm text-blue-600">
                      {blog.url}
                    </p>
                  </div>
                  <span className="shrink-0 rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600">
                    {blog.likes} likes
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default UserPage;
