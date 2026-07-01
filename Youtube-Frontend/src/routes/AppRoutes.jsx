import React from "react";
import { Routes, Route } from "react-router-dom";

import HomeLayout from "../layouts/HomeLayout";
import WatchLayout from "../layouts/WatchLayout";
import ChannelLayout from "../layouts/ChannelLayout";

import Home from "../pages/Home";
import Shorts from "../pages/Shorts";
import Login from "../pages/Login";
import Register from "../pages/Register";
import VideoPlayer from "../pages/VideoPlayer";
import Channel from "../pages/Channel";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Home Routes */}
      <Route element={<HomeLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/shorts" element={<Shorts />} />
      </Route>

      {/* Authentication */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Watch Video */}
      <Route element={<WatchLayout />}>
        <Route path="/watch/:id" element={<VideoPlayer />} />
      </Route>

      {/* Channel */}
      <Route element={<ChannelLayout />}>
        <Route path="/channel/:id" element={<Channel />} />
      </Route>

      {/* 404 Page */}
      <Route
        path="*"
        element={
          <h1 className="text-center mt-20 text-3xl font-bold">
            404 - Page Not Found
          </h1>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
