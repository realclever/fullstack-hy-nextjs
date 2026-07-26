import { and, asc, eq } from 'drizzle-orm';
import { db } from '../../db';
import { blogs, readingList, users } from '../../db/schema';
import { getCurrentUser } from './session';

export const getUsers = async () => {
  const allUsers = await db.query.users.findMany({
    orderBy: asc(users.name),
    with: {
      blogs: true,
    },
  });

  return allUsers.sort(
    (first, second) =>
      second.blogs.length - first.blogs.length ||
      first.name.localeCompare(second.name),
  );
};

export const getUserWithBlogs = async (username: string) => {
  return db.query.users.findFirst({
    where: eq(users.username, username),
    with: {
      blogs: {
        orderBy: asc(blogs.title),
      },
    },
  });
};

export const getUserWithReadingList = async (username: string) => {
  return db.query.users.findFirst({
    where: eq(users.username, username),
    with: {
      readingList: {
        with: {
          blog: true,
        },
      },
    },
  });
};

export const markReadingListEntryAsRead = async (entryId: number) => {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error('Not logged in');
  }

  await db
    .update(readingList)
    .set({ read: true })
    .where(and(eq(readingList.id, entryId), eq(readingList.userId, user.id)));
};
