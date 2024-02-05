import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { NotificationProvider } from "./components/Notification/context/Notification.context.tsx";
import { Notification } from "./components/Notification/index.tsx";
import { AppProvider } from "./context/App.context.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppProvider>
      <NotificationProvider>
        <App />
        <Notification />
      </NotificationProvider>
    </AppProvider>
  </React.StrictMode>
);
