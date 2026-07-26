'use server';

import bcrypt from 'bcryptjs';
import { randomUUID } from 'crypto';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { db } from '@/db';
import { users } from '@/db/schema';
import { getCurrentUser } from '@/app/services/session';
import { markReadingListEntryAsRead } from '@/app/services/users';

export const registerUser = async (
  _prevState: {
    error: string;
    success: boolean;
    name: string;
  },
  formData: FormData,
) => {
  const username = (formData.get('username') as string).trim();
  const name = (formData.get('name') as string).trim();
  const password = formData.get('password') as string;
  const passwordConfirm = formData.get('passwordConfirm') as string;

  if (username.length < 4) {
    return {
      error: 'Username must be at least 4 characters long',
      success: false,
      name: '',
    };
  }

  if (password.length < 4) {
    return {
      error: 'Password must be at least 4 characters long',
      success: false,
      name: '',
    };
  }

  if (password !== passwordConfirm) {
    return {
      error: 'Passwords do not match',
      success: false,
      name: '',
    };
  }

  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.username, username))
    .limit(1);

  if (existingUser.length > 0) {
    return {
      error: 'Username is already taken',
      success: false,
      name: '',
    };
  }

  const passwordHash = await bcrypt.hash(password, 10);

  await db.insert(users).values({
    username,
    name,
    passwordHash,
  });

  revalidatePath('/users');
  revalidatePath(`/users/${username}`);

  return {
    error: '',
    success: true,
    name,
  };
};

export const generateToken = async () => {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error('Not logged in');
  }

  const token = randomUUID();
  await db.update(users).set({ token }).where(eq(users.id, user.id));
  revalidatePath('/me');
  return token;
};

export const markAsRead = async (formData: FormData) => {
  const entryId = Number(formData.get('entryId'));
  await markReadingListEntryAsRead(entryId);
  revalidatePath('/me');
};
