import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createChannel } from "../services/channelService";

// Page for creating a new YouTube channel
const CreateChannel = () => {
  const navigate = useNavigate();

  // Get username from the URL
  const { username } = useParams();

  // Store all form input values
  const [formData, setFormData] = useState({
    channelname: "",
    channeldescription: "",
    avatar: "",
    channelbanner: "",
  });

  // Update form data whenever an input field changes
  const handleChange = ({ target }) => {
    const { name, value } = target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit the form and create a new channel
  const handleSubmit = async (e) => {
    // Prevent page refresh
    e.preventDefault();

    try {
      // Send channel details to the backend
      await createChannel(username, formData);

      // Navigate to the newly created channel
      navigate(`/channel/${username}`);
    } catch (error) {
      // Display any API errors in the console
      console.log(error.response?.data || error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      {/* Create Channel Form Container */}
      <div className="w-full max-w-xl rounded-xl bg-white p-6 shadow">
        <h1 className="mb-6 text-center text-2xl font-bold">
          Create Your Channel
        </h1>

        {/* Channel Creation Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Channel Name */}
          <input
            type="text"
            name="channelname"
            value={formData.channelname}
            onChange={handleChange}
            placeholder="Channel Name"
            className="w-full rounded border p-3 outline-none focus:ring-2 focus:ring-gray-300"
            required
          />

          {/* Channel Description */}
          <textarea
            name="channeldescription"
            value={formData.channeldescription}
            onChange={handleChange}
            placeholder="Channel Description"
            className="w-full rounded border p-3 outline-none resize-none focus:ring-2 focus:ring-gray-300"
            rows={4}
            required
          />

          {/* Optional Avatar URL */}
          <input
            type="text"
            name="avatar"
            value={formData.avatar}
            onChange={handleChange}
            placeholder="Avatar URL (Optional)"
            className="w-full rounded border p-3 outline-none focus:ring-2 focus:ring-gray-300"
          />

          {/* Optional Banner URL */}
          <input
            type="text"
            name="channelbanner"
            value={formData.channelbanner}
            onChange={handleChange}
            placeholder="Banner URL (Optional)"
            className="w-full rounded border p-3 outline-none focus:ring-2 focus:ring-gray-300"
          />

          {/* Submit Button */}
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
