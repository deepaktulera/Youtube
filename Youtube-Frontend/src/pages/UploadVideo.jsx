import React, { useState } from "react";
import { uploadVideo } from "../services/videoService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// Initial form values
const data = {
  title: "",
  description: "",
  thumbnailUrl: "",
  videoUrl: "",
  category: "",
  uploader: localStorage.getItem("username") || "",
};

// Upload Video page
const UploadVideo = () => {
  const navigate = useNavigate()
  // Store form data
  const [formData, setFormData] = useState(data);
  navigate

  // Update form values when user types
  const handleChange = ({ target }) => {
    const { name, value } = target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle video upload
  const handleSubmit = async (e) => {
    // Prevent page refresh
    e.preventDefault();

    try {
      // Upload video data to the server
      const response = await uploadVideo(formData);

      // Show success message
      toast.success("Video uploaded successfully!");

      // Reset form after successful upload
      setFormData(data);
      navigate("/")

    } catch (error) {
      // Show error message
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-100 p-5">
      {/* Upload Form */}
      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-2xl flex-col gap-4 rounded-2xl bg-white p-6 shadow-md"
      >
        {/* Page Heading */}
        <h1 className="text-center text-3xl font-bold">Upload Video</h1>

        {/* Video Title */}
        <input
          type="text"
          name="title"
          placeholder="Video Title"
          value={formData.title}
          onChange={handleChange}
          className="rounded-xl border p-3 outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        {/* Video Description */}
        <textarea
          name="description"
          placeholder="Video Description"
          value={formData.description}
          onChange={handleChange}
          rows={5}
          className="resize-none rounded-xl border p-3 outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        {/* Thumbnail URL */}
        <input
          type="text"
          name="thumbnailUrl"
          placeholder="Thumbnail URL"
          value={formData.thumbnailUrl}
          onChange={handleChange}
          className="rounded-xl border p-3 outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        {/* Video URL */}
        <input
          type="text"
          name="videoUrl"
          placeholder="Video URL"
          value={formData.videoUrl}
          onChange={handleChange}
          className="rounded-xl border p-3 outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        {/* Video Category */}
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

        {/* Upload Button */}
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
