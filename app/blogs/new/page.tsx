'use client';

import { useActionState } from 'react';
import { createBlog } from '../../actions/blogs';

const initialState = {
  error: '',
  values: {
    title: '',
    author: '',
    url: '',
  },
};

const NewBlog = () => {
  const [state, formAction] = useActionState(createBlog, initialState);

  return (
    <section className="mx-auto max-w-2xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Create a new blog
        </h1>
        <p className="mt-2 text-slate-600">
          Add a new entry to the blog collection
        </p>
      </div>
      <form
        action={formAction}
        className="space-y-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        <div>
          <label
            htmlFor="title"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Title
          </label>
          <input
            id="title"
            type="text"
            name="title"
            required
            minLength={5}
            placeholder="Next.js for cats"
            defaultValue={state.values.title}
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
          />
        </div>
        <div>
          <label
            htmlFor="author"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Author
          </label>
          <input
            id="author"
            type="text"
            name="author"
            required
            minLength={5}
            placeholder="Professor Cat III"
            defaultValue={state.values.author}
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
          />
        </div>
        <div>
          <label
            htmlFor="url"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            URL
          </label>
          <input
            id="url"
            type="url"
            name="url"
            required
            minLength={5}
            placeholder="https://example.com/cats"
            defaultValue={state.values.url}
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
          />
        </div>

        {state.error && (
          <p className="text-sm font-medium text-red-600">{state.error}</p>
        )}
        <div className="flex justify-end">
          <button
            type="submit"
            className="rounded-lg bg-slate-900 px-5 py-3 font-medium text-white transition hover:bg-slate-700"
          >
            Create blog
          </button>
        </div>
      </form>
    </section>
  );
};

export default NewBlog;
