// import Navbar from "../components/home/Navbar/Navbar";

import { Outlet } from "react-router-dom";
import Navbar from "../components/home/Navbar/Navbar";
import Footer from "../components/home/Footer/Footer";

const Layout = () => {
  return (
    <div style={{marginTop : "50px",}}>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
