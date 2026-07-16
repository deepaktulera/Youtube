import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

// Single Layout
const AppLayout = lazy(() => import("../layouts/AppLayout"));

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
const EditVideo = lazy(() => import("../pages/EditVideo"));

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
        {/* Main application routes */}
        <Route element={<AppLayout enableSearch layoutType="home" />}>
          <Route path="/" element={<Home />} />
          <Route path="/shorts" element={<Shorts />} />
        </Route>

        {/* Protected routes with main layout */}
        <Route element={<AppLayout enableSearch layoutType="home" />}>
          <Route element={<ProtectedRoute />}>
            <Route path="/upload" element={<UploadVideo />} />
          </Route>
        </Route>

        {/* Authentication routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Watch page */}
        <Route element={<AppLayout layoutType="watch" />}>
          <Route path="/watch/:id" element={<VideoPlayer />} />
        </Route>

        {/* Edit video */}
        <Route element={<ProtectedRoute />}>
          <Route path="/edit-video/:id" element={<EditVideo />} />
        </Route>

        {/* Channel pages */}
        <Route element={<AppLayout layoutType="channel" />}>
          <Route path="/channel/:username" element={<Channel />} />

          {/* Protected channel routes */}
          <Route element={<ProtectedRoute />}>
            <Route
              path="/create-channel/:username"
              element={<CreateChannel />}
            />

            <Route path="/edit-channel/:username" element={<EditChannel />} />
          </Route>
        </Route>

        {/* Not found page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
