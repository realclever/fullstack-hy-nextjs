import { notFound } from 'next/navigation';
import { likeBlog } from '../../actions/blogs';
import { getBlogById } from '../../services/blogs';

const BlogPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const blog = await getBlogById(Number(id));

  if (!blog) {
    notFound();
  }

  return (
    <section className="mx-auto max-w-2xl">
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-start justify-between gap-6">
          <div className="min-w-0">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              {blog.title}
            </h1>
            <p className="mt-2 text-slate-600">by {blog.author}</p>
          </div>
          <div className="flex shrink-0 flex-col items-stretch gap-2">
            <div className="rounded-full bg-slate-100 px-4 py-2 text-center text-sm font-medium text-slate-700">
              {blog.likes} likes
            </div>
            <form action={likeBlog}>
              <input type="hidden" name="id" value={blog.id} />
              <button
                type="submit"
                aria-label="Like blog"
                className="inline-flex w-full items-center justify-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-500 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-500"
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.9"
                  className="h-4 w-4"
                >
                  <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />
                </svg>
                Like
              </button>
            </form>
          </div>
        </div>
        <a
          href={blog.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-block break-all font-medium text-blue-600 transition hover:text-blue-800 hover:underline"
        >
          {blog.url}
        </a>
      </div>
    </section>
  );
};

export default BlogPage;
