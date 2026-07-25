'use client';

import { useNotification } from './NotificationContext';

export default function Notification() {
  const { notification } = useNotification();

  if (!notification) {
    return null;
  }

  return (
    <div className="fixed right-6 top-24 z-50 w-[min(24rem,calc(100vw-3rem))] animate-[notification-in_220ms_ease-out] rounded-2xl border border-slate-200 bg-white px-4 py-4 shadow-2xl">
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold text-slate-900">Blog App</p>
          <span className="text-xs text-slate-400">now</span>
        </div>

        <p className="mt-1 text-sm leading-5 text-slate-700">{notification}</p>
      </div>
    </div>
  );
}
