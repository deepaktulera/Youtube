import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getChannel, updateChannel } from "../services/channelService";
import { toast } from "react-toastify";

// Page for editing an existing channel
const EditChannel = () => {
  // Get username from the URL
  const { username } = useParams();

  const navigate = useNavigate();

  // Store form data
  const [formData, setFormData] = useState({
    channelname: "",
    channeldescription: "",
    avatar: "",
    channelbanner: "",
  });

  // Fetch channel details when the component loads
  useEffect(() => {
    const fetchChannel = async () => {
      try {
        // Get existing channel information
        const response = await getChannel(username);
        const data = response.data.channel
        

        // Populate the form with existing data
        setFormData({
          channelname: data.channelname || "",
          channeldescription: data.channeldescription || "",
          avatar: data.avatar || "",
          channelbanner: data.channelbanner || "",
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchChannel();
  }, [username]);

  // Update form data when an input changes
  const handleChange = ({ target }) => {
    const { name, value } = target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit updated channel information
  const handleSubmit = async (e) => {
    // Prevent page refresh
    e.preventDefault();

    try {
      // Send updated data to the backend
      await updateChannel(username, formData);

      toast.success("Profile updated successfully!");
      // Navigate back to the channel page
      navigate(`/channel/${username}`);
    } catch (error) {
      // Display any API errors
      toast.error("Profile update failed!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      {/* Edit Channel Form Container */}
      <div className="w-full max-w-xl rounded-xl bg-gray-50 p-6 shadow-2xl">
        <h1 className="mb-6 text-center text-2xl font-bold">
          Edit Channel
        </h1>

        {/* Edit Channel Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Channel Name */}
          <input
            type="text"
            name="channelname"
            value={formData.channelname}
            onChange={handleChange}
            placeholder="Channel Name"
            className="w-full rounded border p-3 outline-none"
            required
          />

          {/* Channel Description */}
          <textarea
            name="channeldescription"
            value={formData.channeldescription}
            onChange={handleChange}
            placeholder="Channel Description"
            rows={4}
            className="w-full rounded border p-3 outline-none resize-none"
            required
          />

          {/* Avatar URL */}
          <input
            type="text"
            name="avatar"
            value={formData.avatar}
            onChange={handleChange}
            placeholder="Avatar URL"
            className="w-full rounded border p-3 outline-none"
          />

          {/* Banner URL */}
          <input
            type="text"
            name="channelbanner"
            value={formData.channelbanner}
            onChange={handleChange}
            placeholder="Banner URL"
            className="w-full rounded border p-3 outline-none"
          />

          {/* Save Button */}
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