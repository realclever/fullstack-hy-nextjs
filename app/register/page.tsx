'use client';

import { useActionState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { registerUser } from '../actions/users';
import { useNotification } from '../components/NotificationContext';

const initialState = {
  error: '',
  success: false,
  name: '',
};

export default function RegisterPage() {
  const [state, formAction] = useActionState(registerUser, initialState);
  const { showNotification } = useNotification();
  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      showNotification(`Welcome to Blog App, ${state.name}!`);
      router.push('/login');
    }
  }, [state, showNotification, router]);

  return (
    <div className="mx-auto max-w-md rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <h1 className="mb-6 text-2xl font-bold">Register</h1>

      <form action={formAction} className="space-y-4">
        <div>
          <label
            htmlFor="username"
            className="mb-1 block text-sm font-medium text-slate-700"
          >
            Username
          </label>
          <input
            id="username"
            name="username"
            type="text"
            required
            className="w-full rounded-md border border-slate-300 px-3 py-2 outline-none transition focus:border-slate-500"
          />
        </div>
        <div>
          <label
            htmlFor="name"
            className="mb-1 block text-sm font-medium text-slate-700"
          >
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="w-full rounded-md border border-slate-300 px-3 py-2 outline-none transition focus:border-slate-500"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="mb-1 block text-sm font-medium text-slate-700"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            className="w-full rounded-md border border-slate-300 px-3 py-2 outline-none transition focus:border-slate-500"
          />
        </div>
        <div>
          <label
            htmlFor="passwordConfirm"
            className="mb-1 block text-sm font-medium text-slate-700"
          >
            Confirm Password
          </label>
          <input
            id="passwordConfirm"
            name="passwordConfirm"
            type="password"
            required
            className="w-full rounded-md border border-slate-300 px-3 py-2 outline-none transition focus:border-slate-500"
          />
        </div>
        {state.error && (
          <p
            data-testid={
              state.error.startsWith('Username')
                ? 'username-error'
                : state.error === 'Passwords do not match'
                  ? 'passwordConfirm-error'
                  : 'registration-error'
            }
            className="text-sm font-medium text-red-600"
          >
            {state.error}
          </p>
        )}
        <button
          type="submit"
          data-testid="register-button"
          className="rounded-md bg-slate-900 px-4 py-2 font-medium text-white transition hover:bg-slate-700"
        >
          Register
        </button>
      </form>
    </div>
  );
}
