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
import UploadVideo from "../pages/UploadVideo";
import NotFound from "../pages/NotFound";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Home Routes */}
      <Route element={<HomeLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/shorts" element={<Shorts />} />
        <Route path="/upload" element={<UploadVideo />} />
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
        <Route path="/channel/:username" element={<Channel />} />
      </Route>

      {/* 404 Page */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
