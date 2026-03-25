import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

// common pages
import App from "./App.jsx";
import BlogPage from "./pages/blogPage.jsx";
import LoginPage from "./pages/loginPage.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";

// admin pages
import Layout from "./pages/admin/layout.jsx";
import Dashboard from "./pages/admin/dashboard.jsx";
import AuthorListPage from "./pages/admin/authorlist.jsx";
import BlogList from "./pages/admin/bloglist.jsx";
import CommentBlogPage from "./pages/admin/commentsBlog.jsx";
import BecomeAuthorPage from "./pages/becomeAuthorPage.jsx";
import CommentsPage from "./pages/admin/commentsPage.jsx";
import SubscribeList from "./pages/admin/subscribe.jsx";

// authors pages
import AuthorLayout from "./pages/authors/layout.jsx";
import AuthorDashboard from "./pages/authors/dashboard.jsx";
import AddBlogPage from "./pages/authors/addblog.jsx";
import BlogListPage from "./pages/authors/blogListPage.jsx";
import PublicCommentedBlog from "./pages/authors/publicCommentedBlogPage.jsx";
import BlogComments from "./pages/authors/blogCommentsPage.jsx";

// all routes are here
const routes = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/blog/:blogId", element: <BlogPage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/become-author", element: <BecomeAuthorPage /> },
  // admin routes
  {
    path: "/admin",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "author-list",
        element: <AuthorListPage />,
      },
      {
        path: "list-blog",
        element: <BlogList />,
      },
      {
        path: "subscribe-list",
        element: <SubscribeList />,
      },
      {
        path: "comments",
        element: <CommentBlogPage />,
      },
      {
        path: "comments/:blogID",
        element: <CommentsPage />,
      },
    ],
  },
  // authors routes
  {
    path: "/author",
    element: <AuthorLayout />,
    children: [
      {
        index: true,
        element: <AuthorDashboard />,
      },
      {
        path: "add-blog",
        element: <AddBlogPage />,
      },
      {
        path: "blog-list",
        element: <BlogListPage />,
      },
      {
        path: "comments",
        element: <PublicCommentedBlog />,
      },
      {
        path: "comments/:blogID",
        element: <BlogComments />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={routes} />
    <ToastContainer />
  </StrictMode>,
);
