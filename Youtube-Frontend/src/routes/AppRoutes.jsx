import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import MainLayout from "../layouts/MainLayout";
import Shorts from "../pages/Shorts";
import Login from "../pages/Login";
import Register from "../pages/Register";
import VideoPlayer from "../pages/VideoPlayer";
import WatchLayout from "../layouts/WatchLayout";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/shorts" element={<Shorts />} />
      </Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route element={<WatchLayout />}>
        <Route path="/watch/:id" element={<VideoPlayer />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
