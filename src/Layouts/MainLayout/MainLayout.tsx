import { Outlet } from "react-router-dom";
import Nav from "../../components/Layout/Nav/Nav";

export default function MainLayout() {
  return (
    <>
    <Nav />
      <Outlet />
    </>
  );
}
