import Link from 'next/link';
import { getBlogs } from '../services/blogs';

const Blogs = () => {
  const blogs = getBlogs();

  return (
    <section>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Blogs list
        </h1>
        <p className="mt-2 text-slate-600">
          Browse the entries in the blog collection.
        </p>
      </div>
      <ul className="grid gap-5">
        {blogs.map((blog) => (
          <li
            key={blog.id}
            className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">
                  <Link
                    href={`/blogs/${blog.id}`}
                    className="transition hover:text-slate-600"
                  >
                    {blog.title}
                  </Link>
                </h2>
                <p className="mt-1 text-sm text-slate-500">by {blog.author}</p>
                <a
                  href={blog.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-block break-all text-sm font-medium text-blue-600 transition hover:text-blue-800 hover:underline"
                >
                  {blog.url}
                </a>
              </div>
              <div className="shrink-0 rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
                {blog.likes} likes
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Blogs;
