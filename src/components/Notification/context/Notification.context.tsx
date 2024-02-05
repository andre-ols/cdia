import { FC, PropsWithChildren, createContext, useState } from "react";

export const NotificationContext = createContext<NotificationContextType>(
  {} as NotificationContextType
);

export type Notification = {
  id: number;
  title: string;
  description: string;
  type: "success" | "error" | "warning";
  duration: number;
};

export type NotificationContextType = {
  notifications: Notification[];
  send: (
    title: string,
    description: string,
    type?: "success" | "error" | "warning",
    duration?: number
  ) => void;
};

export const NotificationProvider: FC<PropsWithChildren> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const send = (
    title: string,
    description: string,
    type: "success" | "error" | "warning" = "success",
    duration: number = 3000
  ) => {
    const newNotification = {
      id: Date.now(),
      title,
      description,
      type,
      duration,
    };

    setNotifications((prev) => [...prev, newNotification]);

    setTimeout(() => {
      setNotifications((prevNotifications) =>
        prevNotifications.filter(
          (notification) => notification.id !== newNotification.id
        )
      );
    }, duration);
  };

  return (
    <NotificationContext.Provider value={{ notifications, send }}>
      {children}
    </NotificationContext.Provider>
  );
};
