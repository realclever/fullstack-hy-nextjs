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
        className="group inline-flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-full border border-rose-100 bg-rose-50/50 px-3 py-1 text-sm font-medium text-rose-500 transition"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.9"
          onAnimationEnd={() => setIsAnimating(false)}
          className={`h-4 w-4 fill-current transition ${
            isAnimating ? 'animate-[heart-pop_600ms_ease-in-out]' : ''
          }`}
        >
          <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />
        </svg>
        <span>Like</span>
      </button>
    </form>
  );
};

export default LikeButton;
