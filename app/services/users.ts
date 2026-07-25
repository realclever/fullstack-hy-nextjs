import { asc, eq } from 'drizzle-orm';
import { db } from '../../db';
import { blogs, users } from '../../db/schema';

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
