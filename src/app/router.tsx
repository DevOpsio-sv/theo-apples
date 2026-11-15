import { Navigate, createBrowserRouter } from "react-router-dom";
import { LocalizedApp } from "../pages/LocalizedPage";

export const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/en" replace /> },
  { path: "*", element: <LocalizedApp /> },
]);
