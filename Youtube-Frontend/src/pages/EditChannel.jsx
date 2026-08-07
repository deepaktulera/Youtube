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
    avatar: null,
    channelbanner: null,
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
          avatar: null,
          channelbanner: null,
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
    const { name, value, files } = target;

    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  // Submit updated channel details
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

      await updateChannel(username, data);

      toast.success("Profile updated successfully!");

      navigate(`/channel/${username}`);
    } catch (error) {
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

          {/* Profile image input */}
          <div>
            <label className="mb-2 block font-medium">
              Channel Avatar
            </label>

            <input
              type="file"
              name="avatar"
              accept="image/*"
              onChange={handleChange}
              className="w-full"
            />
          </div>

          {/* Banner image input */}
          <div>
            <label className="mb-2 block font-medium">
              Channel Banner
            </label>

            <input
              type="file"
              name="channelbanner"
              accept="image/*"
              onChange={handleChange}
              className="w-full"
            />
          </div>

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