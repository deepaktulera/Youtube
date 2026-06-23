import React from "react";
import Navbar from "./Navbar";
import CategoryBar from "./CategoryBar";

const Header = () => {
  return (
    <section className="bg-white w-full h-fit fixed top-0">
      <Navbar />
      <CategoryBar />
    </section>
  );
};

export default Header;