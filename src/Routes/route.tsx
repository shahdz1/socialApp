import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "../Layouts/AuthLayout/AuthLayout";
import NotFound from "../pages/NotFound/NotFound";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";
import MainLayout from "../Layouts/MainLayout/MainLayout";
import Home from "../pages/Home/Home";
import Profile from "../pages/Profile/Profile";

export const routes = createBrowserRouter([
  {
    path: "",
    element: <AuthLayout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Login /> },
      { path: "signup", element: <Register /> },
    ],
  },
  {
    path: "",
    element: <MainLayout />,
    errorElement: <NotFound />,
    children:[
        {path:"home", element:<Home/>},
        {path:"profile", element:<Profile/>}
    ]
  },
]);
