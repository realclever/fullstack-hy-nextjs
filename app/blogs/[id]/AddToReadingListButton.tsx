'use client';

import { useTransition } from 'react';
import { addBlogToReadingList } from '../../actions/blogs';
import { useNotification } from '../../components/NotificationContext';

const AddToReadingListButton = ({
  blogId,
  blogTitle,
}: {
  blogId: number;
  blogTitle: string;
}) => {
  const [isPending, startTransition] = useTransition();
  const { showNotification } = useNotification();
  const handleSubmit = (formData: FormData) => {
    startTransition(async () => {
      await addBlogToReadingList(formData);
      showNotification(`"${blogTitle}" added to your reading list!`);
    });
  };

  return (
    <form action={handleSubmit} className="shrink-0">
      <input type="hidden" name="blogId" value={blogId} />
      <button
        type="submit"
        disabled={isPending}
        className="w-36 cursor-pointer rounded-full border border-slate-300 bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-200 disabled:cursor-wait disabled:opacity-60"
      >
        {isPending ? 'Adding…' : 'Add to reading list'}
      </button>
    </form>
  );
};

export default AddToReadingListButton;
