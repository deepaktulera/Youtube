import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getChannel, updateChannel } from "../services/channelService";

const EditChannel = () => {
  const { username } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    channelname: "",
    channeldescription: "",
    avatar: "",
    channelbanner: "",
  });

  useEffect(() => {
    const fetchChannel = async () => {
      try {
        const response = await getChannel(username);

        setFormData({
          channelname: response.data.channelname || "",
          channeldescription: response.data.channeldescription || "",
          avatar: response.data.avatar || "",
          channelbanner: response.data.channelbanner || "",
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchChannel();
  }, [username]);

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
      await updateChannel(username, formData);

      navigate(`/channel/${username}`);
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-xl rounded-xl bg-white p-6 shadow">
        <h1 className="mb-6 text-center text-2xl font-bold">
          Edit Channel
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="channelname"
            value={formData.channelname}
            onChange={handleChange}
            placeholder="Channel Name"
            className="w-full rounded border p-3 outline-none"
            required
          />

          <textarea
            name="channeldescription"
            value={formData.channeldescription}
            onChange={handleChange}
            placeholder="Channel Description"
            rows={4}
            className="w-full rounded border p-3 outline-none resize-none"
            required
          />

          <input
            type="text"
            name="avatar"
            value={formData.avatar}
            onChange={handleChange}
            placeholder="Avatar URL"
            className="w-full rounded border p-3 outline-none"
          />

          <input
            type="text"
            name="channelbanner"
            value={formData.channelbanner}
            onChange={handleChange}
            placeholder="Banner URL"
            className="w-full rounded border p-3 outline-none"
          />

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