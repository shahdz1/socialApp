import { Outlet } from "react-router-dom";
import Nav from "../../components/Layout/Nav/Nav";
import Footer from "../../components/Layout/Footer/Footer";

export default function AuthLayout() {
  return (
    <>
    <Nav/>
      <Outlet />
      <Footer/>
    </>
  );
}
