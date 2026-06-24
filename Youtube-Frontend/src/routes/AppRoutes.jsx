import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import MainLayout from "../layouts/MainLayout";
import Shorts from "../pages/Shorts";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/shorts" element={<Shorts />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
