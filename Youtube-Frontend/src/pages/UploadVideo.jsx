import React, { useState } from "react";
import { uploadVideo } from "../services/videoService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// Default upload form values
const data = {
  title: "",
  description: "",
  thumbnail: null,
  video: null,
  category: "",
  uploader: localStorage.getItem("username") || "",
};

// Component for uploading a new video
const UploadVideo = () => {
  const navigate = useNavigate();

  // Store video upload form data
  const [formData, setFormData] = useState(data);

  // Update form values when input changes
  const handleChange = ({ target }) => {
    const { name, value, files } = target;

    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  // Handle video upload submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("category", formData.category);
      data.append("uploader", formData.uploader);

      data.append("thumbnail", formData.thumbnail);
      data.append("video", formData.video);

      await uploadVideo(data);

      toast.success("Video uploaded successfully");

      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  return (
    // Upload page container
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-100 p-5">
      {/* Video upload form */}
      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-2xl flex-col gap-4 rounded-2xl bg-white p-6 shadow-md"
      >
        {/* Page title */}
        <h1 className="text-center text-3xl font-bold">
          Upload Video
        </h1>

        {/* Video title input */}
        <input
          type="text"
          name="title"
          placeholder="Video Title"
          value={formData.title}
          onChange={handleChange}
          className="rounded-xl border p-3 outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        {/* Video description input */}
        <textarea
          name="description"
          placeholder="Video Description"
          value={formData.description}
          onChange={handleChange}
          rows={5}
          className="resize-none rounded-xl border p-3 outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        {/* Thumbnail URL input */}
        <input
          type="file"
          name="thumbnail"
          accept="image/*"
          onChange={handleChange}
          required
        />

        {/* Video URL input */}
        <input
          type="file"
          name="video"
          accept="video/*"
          onChange={handleChange}
          required
        />

        {/* Video category selection */}
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="rounded-xl border p-3 outline-none focus:ring-2 focus:ring-blue-500"
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

        {/* Submit upload button */}
        <button
          type="submit"
          className="rounded-xl bg-blue-600 py-3 text-white transition hover:bg-blue-700"
        >
          Upload Video
        </button>
      </form>
    </div>
  );
};

export default UploadVideo;