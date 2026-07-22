import { notFound } from 'next/navigation';
import { getBlogById } from '../../services/blogs';

const BlogPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const blog = getBlogById(Number(id));

  if (!blog) {
    notFound();
  }

  return (
    <section className="mx-auto max-w-2xl">
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              {blog.title}
            </h1>
            <p className="mt-2 text-slate-600">by {blog.author}</p>
            <a
              href={blog.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block break-all font-medium text-blue-600 transition hover:text-blue-800 hover:underline"
            >
              {blog.url}
            </a>
          </div>

          <div className="shrink-0 rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
            {blog.likes} likes
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogPage;
