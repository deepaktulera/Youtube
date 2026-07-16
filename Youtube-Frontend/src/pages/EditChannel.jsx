import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getChannel, updateChannel } from "../services/channelService";
import { toast } from "react-toastify";

// Page component for editing an existing channel
const EditChannel = () => {
  // Get username from route parameters
  const { username } = useParams();

  const navigate = useNavigate();

  // Store channel form data
  const [formData, setFormData] = useState({
    channelname: "",
    channeldescription: "",
    avatar: "",
    channelbanner: "",
  });

  // Fetch existing channel data
  useEffect(() => {
    const fetchChannel = async () => {
      try {
        // Get channel details from backend
        const response = await getChannel(username);
        const data = response.data.channel;

        // Fill form with existing channel data
        setFormData({
          channelname: data.channelname || "",
          channeldescription: data.channeldescription || "",
          avatar: data.avatar || "",
          channelbanner: data.channelbanner || "",
        });
      } catch (error) {
        // Handle fetch error
        console.log(error);
      }
    };

    fetchChannel();
  }, [username]);

  // Update form values when input changes
  const handleChange = ({ target }) => {
    const { name, value } = target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit updated channel details
  const handleSubmit = async (e) => {
    // Prevent page reload
    e.preventDefault();

    try {
      // Send updated channel data
      await updateChannel(username, formData);

      // Show success message and redirect
      toast.success("Profile updated successfully!");
      navigate(`/channel/${username}`);
    } catch (error) {
      // Handle update error
      toast.error("Profile update failed!");
    }
  };

  return (
    // Page container
    <div className="min-h-screen flex items-center justify-center px-4">
      {/* Edit form card */}
      <div className="w-full max-w-xl rounded-xl bg-gray-50 p-6 shadow-2xl">
        <h1 className="mb-6 text-center text-2xl font-bold">
          Edit Channel
        </h1>

        {/* Channel update form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Channel name input */}
          <input
            type="text"
            name="channelname"
            value={formData.channelname}
            onChange={handleChange}
            placeholder="Channel Name"
            className="w-full rounded border p-3 outline-none"
            required
          />

          {/* Channel description input */}
          <textarea
            name="channeldescription"
            value={formData.channeldescription}
            onChange={handleChange}
            placeholder="Channel Description"
            rows={4}
            className="w-full rounded border p-3 outline-none resize-none"
            required
          />

          {/* Profile image URL input */}
          <input
            type="text"
            name="avatar"
            value={formData.avatar}
            onChange={handleChange}
            placeholder="Avatar URL"
            className="w-full rounded border p-3 outline-none"
          />

          {/* Banner image URL input */}
          <input
            type="text"
            name="channelbanner"
            value={formData.channelbanner}
            onChange={handleChange}
            placeholder="Banner URL"
            className="w-full rounded border p-3 outline-none"
          />

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

export default EditChannel;