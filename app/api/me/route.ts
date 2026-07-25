import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';
import { db } from '@/db';
import { users } from '@/db/schema';

export const GET = async (request: Request) => {
  const authorization = request.headers.get('authorization');

  if (!authorization?.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const token = authorization.slice(7);

  const user = await db.query.users.findFirst({
    where: eq(users.token, token),
    with: {
      blogs: true,
    },
  });

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  return NextResponse.json({
    id: user.id,
    username: user.username,
    name: user.name,
    blogs: user.blogs.map((blog) => ({
      id: blog.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes,
    })),
  });
};
