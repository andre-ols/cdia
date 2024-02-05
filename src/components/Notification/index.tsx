import classNames from "classnames";
import { useContext } from "react";
import { createPortal } from "react-dom";
import { NotificationContext } from "./context/Notification.context";

export const Notification = () => {
  const { notifications } = useContext(NotificationContext);
  const overlayRoot = document.getElementById("overlay-root") as HTMLElement;

  return createPortal(
    <div className="fixed sm:bottom-8 sm:right-8 bottom-0 right-0 w-full sm:w-auto flex flex-col gap-4">
      {notifications.map((notification) => (
        <div
          className={classNames("p-4 rounded-lg shadow-lg", {
            "bg-green-500": notification.type === "success",
            "bg-red-500": notification.type === "error",
            "bg-yellow-500": notification.type === "warning",
          })}
        >
          <h2 className="text-white font-medium">{notification.title}</h2>
          <p className="text-white text-sm">{notification.description}</p>
        </div>
      ))}
    </div>,
    overlayRoot
  );
};
