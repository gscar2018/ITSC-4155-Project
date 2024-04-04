import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createMemoryRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import TestPage from "./pages/TestPage";
import ErrorPage from "./pages/ErrorPage";
import NavBar from "./components/NavBar";
import PostPage from "./pages/PostPage";
import UploadPage from "./pages/Upload";

const routes = createRoutesFromElements(
  <Route path="/" element={<NavBar />}>
    <Route element={<HomePage />} path="/" />
    <Route element={<TestPage />} path="/test" />
    <Route
      element={<PostPage />}
      path="/post/:id"
      errorElement={<ErrorPage />}
    />
    <Route element={<UploadPage />} path="/upload" />
    <Route element={<ErrorPage />} path="*" />
  </Route>
);

const router = createBrowserRouter(routes);
ReactDOM.hydrateRoot(
  document.getElementById("root") as HTMLElement,
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
