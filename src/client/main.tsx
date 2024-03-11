import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import TestPage from "./pages/TestPage";
import ErrorPage from "./pages/ErrorPage";
import NavBar from "./components/NavBar";
import PostPage from "./pages/PostPage";
import { fetchPosts, fetchPostSlug } from "./api/apiCalls";

const routes = createRoutesFromElements(
  <Route path="/" element={<NavBar />}>
    <Route element={<HomePage />} path="/" loader={fetchPosts} />
    <Route element={<TestPage />} path="/test" />
    <Route
      element={<PostPage />}
      path="/post/:id"
      loader={fetchPostSlug}
      errorElement={<ErrorPage />}
    />
    <Route element={<ErrorPage />} path="*" />
  </Route>
);

const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
