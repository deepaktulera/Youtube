import React, { useState } from "react";
import { uploadVideo } from "../services/videoService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// Default upload form values
const initialData = {
  title: "",
  description: "",
  thumbnail: null,
  video: null,
  category: "",
  uploader: localStorage.getItem("username") || "",
};

const UploadVideo = () => {
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState(initialData);

  // Loading state
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = ({ target }) => {
    const { name, value, files } = target;

    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  // Upload video
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const data = new FormData();

      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("category", formData.category);
      data.append("uploader", formData.uploader);

      data.append("thumbnail", formData.thumbnail);
      data.append("video", formData.video);

      await uploadVideo(data);

      toast.success("Video uploaded successfully!");

      // Optional: Reset form
      setFormData(initialData);

      // Redirect to home page
      navigate("/");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to upload video."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-100 p-5">
      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-2xl flex-col gap-4 rounded-2xl bg-white p-6 shadow-md"
      >
        <h1 className="text-center text-3xl font-bold">
          Upload Video
        </h1>

        {/* Title */}
        <input
          type="text"
          name="title"
          placeholder="Video Title"
          value={formData.title}
          onChange={handleChange}
          disabled={loading}
          className="rounded-xl border p-3 outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
          required
        />

        {/* Description */}
        <textarea
          name="description"
          placeholder="Video Description"
          value={formData.description}
          onChange={handleChange}
          disabled={loading}
          rows={5}
          className="resize-none rounded-xl border p-3 outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
          required
        />

        {/* Thumbnail */}
        <div>
          <label className="block mb-2 font-medium">
            Thumbnail
          </label>
          <input
            type="file"
            name="thumbnail"
            accept="image/*"
            onChange={handleChange}
            disabled={loading}
            className="w-full disabled:cursor-not-allowed"
            required
          />
        </div>

        {/* Video */}
        <div>
          <label className="block mb-2 font-medium">
            Video
          </label>
          <input
            type="file"
            name="video"
            accept="video/*"
            onChange={handleChange}
            disabled={loading}
            className="w-full disabled:cursor-not-allowed"
            required
          />
        </div>

        {/* Category */}
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          disabled={loading}
          className="rounded-xl border p-3 outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
          required
        >
          <option value="">Select Category</option>
          <option value="Music">Music</option>
          <option value="Gaming">Gaming</option>
          <option value="Education">Education</option>
          <option value="Programming">Programming</option>
          <option value="Sports">Sports</option>
          <option value="News">News</option>
          <option value="Entertainment">Entertainment</option>
        </select>

        {/* Upload Button */}
        <button
          type="submit"
          disabled={loading}
          className={`rounded-xl py-3 text-white font-semibold transition duration-300 ${
            loading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Uploading..." : "Upload Video"}
        </button>
      </form>
    </div>
  );
};

export default UploadVideo;