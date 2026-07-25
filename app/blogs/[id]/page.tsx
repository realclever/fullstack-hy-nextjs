import { notFound } from 'next/navigation';

import { addBlogToReadingList } from '../../actions/blogs';
import { getBlogById, isBlogInReadingList } from '../../services/blogs';
import { getCurrentUser } from '../../services/session';
import LikeButton from './LikeButton';

const BlogPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const blog = await getBlogById(Number(id));
  const user = await getCurrentUser();

  if (!blog) {
    notFound();
  }

  const isOwnBlog = user?.id === blog.userId;
  const isInReadingList = user ? await isBlogInReadingList(blog.id) : false;

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
          <div className="flex w-36 shrink-0 flex-col items-stretch gap-2">
            <div className="rounded-full bg-slate-100 px-4 py-2 text-center text-sm font-medium text-slate-700">
              {blog.likes} likes
            </div>
            <LikeButton blogId={blog.id} />
          </div>
        </div>
        <div className="mt-6 flex items-end justify-between gap-6">
          <a
            href={blog.url}
            target="_blank"
            rel="noopener noreferrer"
            className="min-w-0 break-all font-medium text-blue-600 transition hover:text-blue-800 hover:underline"
          >
            {blog.url}
          </a>
          {user && (
            <>
              {isInReadingList ? (
                <button
                  type="button"
                  disabled
                  className="w-36 shrink-0 rounded-full bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700"
                >
                  In reading list
                </button>
              ) : (
                !isOwnBlog && (
                  <form action={addBlogToReadingList} className="shrink-0">
                    <input type="hidden" name="blogId" value={blog.id} />

                    <button
                      type="submit"
                      className="w-36 rounded-full bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-200"
                    >
                      Add to reading list
                    </button>
                  </form>
                )
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default BlogPage;
