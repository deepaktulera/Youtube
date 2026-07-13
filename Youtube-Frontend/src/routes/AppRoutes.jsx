import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

// Layouts
const HomeLayout = lazy(() => import("../layouts/HomeLayout"));
const WatchLayout = lazy(() => import("../layouts/WatchLayout"));
const ChannelLayout = lazy(() => import("../layouts/ChannelLayout"));

// Pages
const Home = lazy(() => import("../pages/Home"));
const Shorts = lazy(() => import("../pages/Shorts"));
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));
const VideoPlayer = lazy(() => import("../pages/VideoPlayer"));
const Channel = lazy(() => import("../pages/Channel"));
const UploadVideo = lazy(() => import("../pages/UploadVideo"));
const CreateChannel = lazy(() => import("../pages/CreateChannel"));
const EditChannel = lazy(() => import("../pages/EditChannel"));
const NotFound = lazy(() => import("../pages/NotFound"));
const EditVideo = lazy(() => import("../pages/EditVideo"))

const AppRoutes = () => {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <h1 className="text-xl font-semibold">Loading...</h1>
        </div>
      }
    >
      <Routes>
        {/* Home Routes */}
        <Route element={<HomeLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/shorts" element={<Shorts />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/upload" element={<UploadVideo />} />
          </Route>
        </Route>

        {/* Authentication */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Watch Video */}
        <Route element={<WatchLayout />}>
          <Route path="/watch/:id" element={<VideoPlayer />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route
            path="/edit-video/:id" element={<EditVideo />} />
        </Route>

        {/* Channel */}
        <Route element={<ChannelLayout />}>
          <Route path="/channel/:username" element={<Channel />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route
              path="/create-channel/:username"
              element={<CreateChannel />}
            />
            <Route path="/edit-channel/:username" element={<EditChannel />} />
          </Route>
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
