import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createChannel } from "../services/channelService";
import { toast } from "react-toastify";

// Page component for creating a new channel
const CreateChannel = () => {
  const navigate = useNavigate();

  // Get username from route parameters
  const { username } = useParams();

  // Store channel form data
  const [formData, setFormData] = useState({
    channelname: "",
    channeldescription: "",
    avatar: null,
    channelbanner: null,
  });

  // Update form state when input changes
  const handleChange = ({ target }) => {
    const { name, value, files } = target;

    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  // Handle channel creation
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      data.append("channelname", formData.channelname);
      data.append("channeldescription", formData.channeldescription);

      if (formData.avatar) {
        data.append("avatar", formData.avatar);
      }

      if (formData.channelbanner) {
        data.append("channelbanner", formData.channelbanner);
      }

      await createChannel(username, data);

      toast.success("Channel created successfully!");

      navigate(`/channel/${username}`);
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to create channel!");
    }
  };

  return (
    // Page container
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      {/* Form card */}
      <div className="w-full max-w-xl rounded-xl bg-white p-6 shadow">
        <h1 className="mb-6 text-center text-2xl font-bold">
          Create Your Channel
        </h1>

        {/* Channel creation form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Channel name input */}
          <input
            type="text"
            name="channelname"
            value={formData.channelname}
            onChange={handleChange}
            placeholder="Channel Name"
            className="w-full rounded border p-3 outline-none focus:ring-2 focus:ring-gray-300"
            required
          />

          {/* Channel description input */}
          <textarea
            name="channeldescription"
            value={formData.channeldescription}
            onChange={handleChange}
            placeholder="Channel Description"
            className="w-full rounded border p-3 outline-none resize-none focus:ring-2 focus:ring-gray-300"
            rows={4}
            required
          />

          {/* Avatar URL input */}
          <input
            type="file"
            name="avatar"
            accept="image/*"
            onChange={handleChange}
            placeholder="Avatar (Optional)"
            className="w-full rounded border p-3 outline-none focus:ring-2 focus:ring-gray-300"
          />

          {/* Banner URL input */}
          <input
            type="file"
            name="channelbanner"
            accept="image/*"
            onChange={handleChange}
            placeholder="Banner URL (Optional)"
            className="w-full rounded border p-3 outline-none focus:ring-2 focus:ring-gray-300"
          />

          {/* Submit button */}
          <button
            type="submit"
            className="w-full rounded bg-black py-3 text-white transition hover:bg-gray-900"
          >
            Create Channel
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateChannel;