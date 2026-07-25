'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';

type NotificationContextValue = {
  notification: string;
  showNotification: (message: string) => void;
};

const NotificationContext = createContext<NotificationContextValue | undefined>(
  undefined,
);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notification, setNotification] = useState('');

  const showNotification = (message: string) => {
    setTimeout(() => {
      setNotification(message);

      setTimeout(() => {
        setNotification('');
      }, 3000);
    }, 700);
  };

  return (
    <NotificationContext.Provider value={{ notification, showNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error(
      'useNotification must be used within a NotificationProvider',
    );
  }

  return context;
};
