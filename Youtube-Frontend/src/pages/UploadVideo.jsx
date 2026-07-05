import React, { useState } from "react";
import { uploadVideo } from "../services/videoService";

const data = {
  title: "",
  description: "",
  thumbnailUrl: "",
  videoUrl: "",
  category: "",
  uploader: localStorage.getItem("username") || "",
};

const UploadVideo = () => {
  const [formData, setFormData] = useState(data);

  const handleChange = ({ target }) => {
    const { name, value } = target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await uploadVideo(formData);

      alert(response.data.message);

      setFormData(data);
    } catch (error) {
      console.log(error.response?.data || error.message);
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-100 p-5">
      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-2xl flex-col gap-4 rounded-2xl bg-white p-6 shadow-md"
      >
        <h1 className="text-center text-3xl font-bold">Upload Video</h1>

        <input
          type="text"
          name="title"
          placeholder="Video Title"
          value={formData.title}
          onChange={handleChange}
          className="rounded-xl border p-3 outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <textarea
          name="description"
          placeholder="Video Description"
          value={formData.description}
          onChange={handleChange}
          rows={5}
          className="resize-none rounded-xl border p-3 outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <input
          type="text"
          name="thumbnailUrl"
          placeholder="Thumbnail URL"
          value={formData.thumbnailUrl}
          onChange={handleChange}
          className="rounded-xl border p-3 outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <input
          type="text"
          name="videoUrl"
          placeholder="Video URL"
          value={formData.videoUrl}
          onChange={handleChange}
          className="rounded-xl border p-3 outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

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
