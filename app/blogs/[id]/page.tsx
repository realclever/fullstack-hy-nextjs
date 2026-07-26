import { notFound } from 'next/navigation';

import { getBlogById, isBlogInReadingList } from '../../services/blogs';
import { getCurrentUser } from '../../services/session';
import AddToReadingListButton from './AddToReadingListButton';
import LikeButton from './LikeButton';
import Link from 'next/link';

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
    <section>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Blog details
        </h1>
        <p className="mt-2 text-slate-600">
          View and interact with this blog entry.
        </p>
      </div>
      <div>
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between gap-6">
            <div className="min-w-0">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                {blog.title}
              </h2>
              <div className="mt-2">
                <p className="text-slate-600">by {blog.author}</p>
                {blog.user && (
                  <p className="mt-1 text-sm text-slate-500">
                    added by{' '}
                    <Link
                      href={`/users/${blog.user.username}`}
                      className="font-medium transition hover:text-slate-800 hover:underline"
                    >
                      {blog.user.name}
                    </Link>
                  </p>
                )}
              </div>
            </div>
            <div className="flex w-36 shrink-0 flex-col items-stretch gap-2">
              <div className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-center text-sm font-medium text-slate-700">
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
                    className="w-36 shrink-0 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm font-medium text-slate-700"
                  >
                    In reading list
                  </button>
                ) : (
                  !isOwnBlog && (
                    <AddToReadingListButton
                      blogId={blog.id}
                      blogTitle={blog.title}
                    />
                  )
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogPage;
