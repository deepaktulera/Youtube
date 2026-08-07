import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getVideo, updateVideo } from "../services/videoService";

// Page component for editing an existing video
const EditVideo = () => {
  // Get video id from URL parameters
  const { id } = useParams();

  const navigate = useNavigate();

  // Store video form data
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    thumbnail: "",
    videoUrl: "",
    category: "",
  });

  // Fetch video details when component loads
  useEffect(() => {
    const fetchVideo = async () => {
      try {
        // Get existing video data
        const response = await getVideo(id);

        // Fill form with existing video details
        setFormData({
          title: response.data.title,
          description: response.data.description,
          thumbnail: response.data.thumbnailUrl,
          videoUrl: response.data.videoUrl,
          category: response.data.category,
        });
      } catch (error) {
        // Handle fetch error
        console.log(error);
      }
    };

    fetchVideo();
  }, [id]);

  // Update form data when input changes
  const handleChange = ({ target }) => {
    const { name, value } = target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit updated video information
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("category", formData.category);

      if (formData.thumbnail) {
        data.append("thumbnail", formData.thumbnail);
      }

      if (formData.video) {
        data.append("video", formData.video);
      }

      await updateVideo(id, data);

      toast.success("Video updated successfully!");
      navigate(`/watch/${id}`);
    } catch (error) {
      toast.error("Video update failed!");
    }
  };

  return (
    // Page container
    <div className="min-h-screen flex items-center justify-center px-4">
      {/* Edit video form card */}
      <div className="w-full max-w-xl rounded-xl bg-gray-50 p-6 shadow-2xl">
        <h1 className="mb-6 text-center text-2xl font-bold">
          Edit Video
        </h1>

        {/* Video update form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Video title input */}
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title"
            className="w-full rounded border p-3 outline-none"
            required
          />

          {/* Video description input */}
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            rows={4}
            className="w-full rounded border p-3 outline-none resize-none"
            required
          />

          {/* Thumbnail input */}
          <input
            type="file"
            name="thumbnail"
            accept="image/*"
            placeholder="Image"
            onChange={handleChange}
            className="w-full rounded border p-3 outline-none"
          />

          {/* Video URL input */}
          <input
            type="file"
            name="video"
            accept="video/*"
            onChange={handleChange}
            placeholder="Video"
            className="w-full rounded border p-3 outline-none"
          />

          {/* Video category selection */}
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full rounded-xl border p-3 outline-none focus:ring-2 focus:ring-blue-500"
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

          {/* Save changes button */}
          <button
            type="submit"
            className="w-full rounded bg-black py-3 text-white hover:bg-gray-900"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditVideo;