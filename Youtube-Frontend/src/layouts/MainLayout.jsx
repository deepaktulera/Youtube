import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const MainLayout = () => {
  return (
    <div className="h-screen">
      <Header />
      <Sidebar />

      <main className="pt-28 md:pl-20">
        <Outlet />
      </main>
    </div>
  );
};


export default MainLayout;
