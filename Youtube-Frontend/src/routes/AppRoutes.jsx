import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import MainLayout from "../layouts/MainLayout";
import Shorts from "../pages/Shorts";
import Login from "../pages/Login";
import Register from "../pages/Register";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/shorts" element={<Shorts />} />
      </Route>
      <Route path="/login" element={<Login />} ></Route>
      <Route path="/register" element={<Register />} ></Route>
    </Routes>
  );
};

export default AppRoutes;
