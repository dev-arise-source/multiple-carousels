import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./layout.tsx";
import "./index.css";

// Carousels routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Helllo</div>,
    errorElement: <h1 className="text-white">404 page</h1>,
  },
  {
    path: "/cs1",
    element: <div>Cs 1</div>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Layout>
      <RouterProvider router={router} />
    </Layout>

    {/* <App /> */}
  </React.StrictMode>
);
