import api from "./axios";

export const getAllVideos = () => api.get("/videos");

export const getVideo = (id) => api.get(`/video/${id}`);

export const getChannelVideos = (uploader) =>
  api.get(`/videos/channel/${uploader}`);

export const uploadVideo = (data) =>
    api.post("/upload", data);

export const deleteVideo = (id) =>
    api.delete(`/video/${id}`);

export const updateVideo = (id,data)=>
    api.put(`/video/${id}`,data);