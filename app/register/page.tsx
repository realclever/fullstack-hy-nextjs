import { registerUser } from '../actions/users';

export default function RegisterPage() {
  return (
    <div className="mx-auto max-w-md rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <h1 className="mb-6 text-2xl font-bold">Register</h1>
      <form action={registerUser} className="space-y-4">
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
        <button
          type="submit"
          className="rounded-md bg-slate-900 px-4 py-2 font-medium text-white transition hover:bg-slate-700"
        >
          Register
        </button>
      </form>
    </div>
  );
}
