'use client';

import { useState } from 'react';
import { likeBlog } from '../../actions/blogs';

const LikeButton = ({ blogId }: { blogId: number }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    setIsAnimating(false);

    requestAnimationFrame(() => {
      setIsAnimating(true);
    });
  };

  return (
    <form action={likeBlog}>
      <input type="hidden" name="id" value={blogId} />

      <button
        type="submit"
        aria-label="Like blog"
        onClick={handleClick}
        className="inline-flex w-full items-center justify-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-500 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-500"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.9"
          onAnimationEnd={() => setIsAnimating(false)}
          className={`h-4 w-4 ${
            isAnimating ? 'animate-[heart-pop_600ms_ease-in-out]' : ''
          }`}
        >
          <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />
        </svg>
      </button>
    </form>
  );
};

export default LikeButton;
