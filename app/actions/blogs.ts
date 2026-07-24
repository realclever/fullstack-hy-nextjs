'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import { addBlog, addLike } from '../services/blogs';

export const createBlog = async (
  _prevState: {
    error: string;
    values: {
      title: string;
      author: string;
      url: string;
    };
  },
  formData: FormData,
) => {
  const session = await auth();

  if (!session) {
    redirect('/login');
  }

  const title = (formData.get('title') as string).trim();
  const author = (formData.get('author') as string).trim();
  const url = (formData.get('url') as string).trim();

  if (!title || title.length < 5) {
    return {
      error: 'Title must be at least 5 characters long',
      values: { title, author, url },
    };
  }

  if (!author || author.length < 5) {
    return {
      error: 'Author must be at least 5 characters long',
      values: { title, author, url },
    };
  }

  if (!url || url.length < 5) {
    return {
      error: 'URL must be at least 5 characters long',
      values: { title, author, url },
    };
  }

  await addBlog(title, author, url);
  revalidatePath('/blogs');
  redirect('/blogs');
};

export const likeBlog = async (formData: FormData) => {
  const id = Number(formData.get('id'));

  await addLike(id);
  revalidatePath(`/blogs/${id}`);
  revalidatePath('/blogs');
};
