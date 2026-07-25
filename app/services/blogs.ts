import { and, eq } from 'drizzle-orm';
import { db } from '../../db';
import { blogs, readingList } from '../../db/schema';
import { getCurrentUser } from './session';

export const getBlogs = async () => {
  return db.query.blogs.findMany();
};

export const addBlog = async (title: string, author: string, url: string) => {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error('Not logged in');
  }

  const [newBlog] = await db
    .insert(blogs)
    .values({
      title,
      author,
      url,
      userId: user.id,
    })
    .returning({ id: blogs.id });

  await db.insert(readingList).values({
    userId: user.id,
    blogId: newBlog.id,
  });
};

export const getBlogById = async (id: number) => {
  return db.query.blogs.findFirst({
    where: eq(blogs.id, id),
  });
};

export const addLike = async (id: number) => {
  const blog = await getBlogById(id);

  if (blog) {
    await db
      .update(blogs)
      .set({ likes: blog.likes + 1 })
      .where(eq(blogs.id, id));
  }
};

export const isBlogInReadingList = async (blogId: number) => {
  const user = await getCurrentUser();

  if (!user) {
    return false;
  }

  const existingEntry = await db.query.readingList.findFirst({
    where: and(eq(readingList.userId, user.id), eq(readingList.blogId, blogId)),
  });

  return Boolean(existingEntry);
};

export const addToReadingList = async (blogId: number) => {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error('Not logged in');
  }

  const existingEntry = await db.query.readingList.findFirst({
    where: and(eq(readingList.userId, user.id), eq(readingList.blogId, blogId)),
  });

  if (existingEntry) {
    return;
  }

  await db.insert(readingList).values({
    userId: user.id,
    blogId,
  });
};
