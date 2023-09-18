import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

// pages import
import Home from "./pages/home/index.tsx";
import ImageSlideShow1 from "./pages/1-image-slideshow";

// root
import Layout from "./layout.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <h1 className="text-white">404 page</h1>,
  },
  {
    path: "/1-image-slideshow",
    element: <ImageSlideShow1 />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Layout>
      <RouterProvider router={router} />
    </Layout>
  </React.StrictMode>
);
