import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import StudentDashboard from "./feat/StudentDashboard";
import ConfigPage from "./feat/ConfigPage";
import Unlock from "./feat/Unlock";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/config",
    element: <ConfigPage />,
  },
  {
    path: "/student-dashboard",
    element: <StudentDashboard />,
  },
  {
    path: "/unlock-hint",
    element: <Unlock />,
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
