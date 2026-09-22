import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "../Layouts/AuthLayout/AuthLayout";
import NotFound from "../pages/NotFound/NotFound";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";
import MainLayout from "../Layouts/MainLayout/MainLayout";
import Home from "../pages/Home/Home";
import Profile from "../pages/Profile/Profile";
import AuthProtected from "../guard/authProtected/AuthProtected";
import MainProtected from "../guard/mainProtected/MainProtected";

export const routes = createBrowserRouter([
  {
    path: "/",
    element:
      <AuthProtected>
        <AuthLayout />
      </AuthProtected>
    ,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Login /> },
      { path: "signup", element: <Register /> },
    ],
  },
  {
    path: "/home",
    element: 
      <MainProtected>
        <MainLayout />
      </MainProtected>
    ,
    errorElement: <NotFound />,
    children: [{ index: true, element: <Home /> }],
  },
  {
    path: "/profile",
    element: (
      <MainProtected>
        <MainLayout />
      </MainProtected>
    ),
    errorElement: <NotFound />,
    children: [{ index: true, element: <Profile /> }],
  },
]);
