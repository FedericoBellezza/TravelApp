import { Outlet } from "react-router-dom";
import Header from "../components/Header";

export default function DefaulLayout() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}
