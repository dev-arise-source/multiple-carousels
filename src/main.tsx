import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

// pages import
import Home from "./pages/home/index.tsx";
import ImageSlideShow from "./pages/1-image-slideshow";

// root
import Layout from "./layout.tsx";
import PhotoSlider from "./pages/2-photo-slider";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <h1 className="text-white">404 page</h1>,
  },
  {
    path: "/1-image-slideshow",
    element: <ImageSlideShow />,
  },
  {
    path: "/2-photo-slideshow",
    element: <PhotoSlider />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Layout>
      <RouterProvider router={router} />
    </Layout>
  </React.StrictMode>
);
