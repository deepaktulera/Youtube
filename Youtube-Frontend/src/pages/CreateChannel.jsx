import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createChannel } from "../services/channelService";

const CreateChannel = () => {
  const navigate = useNavigate();
  const { username } = useParams();

  const [formData, setFormData] = useState({
    channelname: "",
    channeldescription: "",
    avatar: "",
    channelbanner: "",
  });

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
      await createChannel(username, formData);

      navigate(`/channel/${username}`);
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-xl rounded-xl bg-white p-6 shadow">
        <h1 className="mb-6 text-center text-2xl font-bold">
          Create Your Channel
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="channelname"
            value={formData.channelname}
            onChange={handleChange}
            placeholder="Channel Name"
            className="w-full rounded border p-3 outline-none focus:ring-2 focus:ring-gray-300"
            required
          />

          <textarea
            name="channeldescription"
            value={formData.channeldescription}
            onChange={handleChange}
            placeholder="Channel Description"
            className="w-full rounded border p-3 outline-none resize-none focus:ring-2 focus:ring-gray-300"
            rows={4}
            required
          />

          <input
            type="text"
            name="avatar"
            value={formData.avatar}
            onChange={handleChange}
            placeholder="Avatar URL (Optional)"
            className="w-full rounded border p-3 outline-none focus:ring-2 focus:ring-gray-300"
          />

          <input
            type="text"
            name="channelbanner"
            value={formData.channelbanner}
            onChange={handleChange}
            placeholder="Banner URL (Optional)"
            className="w-full rounded border p-3 outline-none focus:ring-2 focus:ring-gray-300"
          />

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