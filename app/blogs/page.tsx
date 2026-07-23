import Link from 'next/link';
import { getBlogs } from '../services/blogs';

const Blogs = async ({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>;
}) => {
  const { filter = '' } = await searchParams;

  const blogs = [...(await getBlogs())]
    .sort((a, b) => b.likes - a.likes)
    .filter((blog) => blog.title.toLowerCase().includes(filter.toLowerCase()));

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
      <form method="get" className="mb-5 flex flex-col gap-3 sm:flex-row">
        <input
          type="text"
          name="filter"
          defaultValue={filter}
          placeholder="Search by title"
          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
        />
        <button
          type="submit"
          className="rounded-lg bg-slate-100 px-5 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-200 hover:text-slate-950"
        >
          Search
        </button>
      </form>
      {blogs.length === 0 ? (
        <p className="py-8 text-center text-slate-500">
          {' '}
          Nothing here yet — try another search.
        </p>
      ) : (
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

                  <p className="mt-1 text-sm text-slate-500">
                    by {blog.author}
                  </p>
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
      )}
    </section>
  );
};

export default Blogs;
