import React, { useState } from "react";
import axios from "axios";

const UploadVideo = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    thumbnailUrl: "",
    videoUrl: "",
    category: "",
    uploader: localStorage.getItem("username") || "",
    channel: localStorage.getItem("name") || "",
  });

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/video/upload`,
        formData
      );

      alert(res.data.message);

      // Reset form (keep uploader & channel)
      setFormData({
        title: "",
        description: "",
        thumbnailUrl: "",
        videoUrl: "",
        category: "",
        uploader: localStorage.getItem("username") || "",
        channel: localStorage.getItem("name") || "",
      });
    } catch (error) {
      console.log(error.response?.data || error.message);
      alert(error.response?.data?.message || "Something went wrong");
    }
  };
  console.log(formData);

  return (
    <div className="w-full min-h-screen flex justify-center items-center p-5 bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white shadow-md rounded-2xl p-6 flex flex-col gap-4"
      >
        <h1 className="text-3xl font-bold text-center">
          Upload Video
        </h1>

        <input
          type="text"
          name="title"
          placeholder="Video Title"
          value={formData.title}
          onChange={handleChange}
          className="border rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <textarea
          name="description"
          placeholder="Video Description"
          value={formData.description}
          onChange={handleChange}
          className="border rounded-xl p-3 h-32 resize-none outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <input
          type="text"
          name="thumbnailUrl"
          placeholder="Thumbnail URL"
          value={formData.thumbnailUrl}
          onChange={handleChange}
          className="border rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <input
          type="text"
          name="videoUrl"
          placeholder="Video URL"
          value={formData.videoUrl}
          onChange={handleChange}
          className="border rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="border rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500"
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

        <button
          type="submit"
          className="bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition"
        >
          Upload Video
        </button>
      </form>
    </div>
  );
};

export default UploadVideo;