import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/Home/Home";
import Blogs from "../pages/Blogs/Blogs";
import ServiceDetails from "../pages/Services/Service/ServiceDetails";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import PrivateRoute from "./PrivateRoutes";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import MyReviews from "../pages/Reviews/MyReviews/MyReviews";
import AddService from "../pages/Services/AddService/AddService";
import Services from "../pages/Services/Services";
import Reviews from "../pages/Reviews/Reviews";
import AddReview from "../pages/Reviews/AddReview/AddReview";
import UpdateMyReview from "../pages/Reviews/MyReviews/UpdateMyReview/UpdateMyReview";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/services",
        element: <Services></Services>,
        loader: () => fetch("https://better-aim-server.vercel.app/services"),
      },
      {
        path: "/services/:id",
        element: <ServiceDetails></ServiceDetails>,
        loader: ({ params }) =>
          fetch(`https://better-aim-server.vercel.app/services/${params.id}`),
      },
      {
        path: "/blogs",
        element: <Blogs></Blogs>,
        loader: () => fetch("https://better-aim-server.vercel.app/blogs"),
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/reviews",
        element: <Reviews></Reviews>,
        loader: () => fetch("https://better-aim-server.vercel.app/reviews"),
      },
      {
        path: "/addreview",
        element: (
          <PrivateRoute>
            <AddReview></AddReview>
          </PrivateRoute>
        ),
      },
      {
        path: "/myreviews",
        element: (
          <PrivateRoute>
            <MyReviews></MyReviews>
          </PrivateRoute>
        ),
      },
      {
        path: "/addservice",
        element: (
          <PrivateRoute>
            <AddService></AddService>
          </PrivateRoute>
        ),
      },
      {
        path: `/myReviews/:id`,
        element: (
          <PrivateRoute>
            <UpdateMyReview></UpdateMyReview>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`https://better-aim-server.vercel.app/myReviews/${params.id}`),
      },
    ],
  },

  {
    path: "*",
    element: <ErrorPage></ErrorPage>,
  },
]);
