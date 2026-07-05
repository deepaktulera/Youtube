import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getChannel, deleteChannel } from "../services/channelService";
import ChannelVideos from "../components/ChannelVideos";
import defaultProfile from "../assets/icons/default_profile.svg";
import defaultBanner from "../assets/icons/channel_banner.svg";

const Channel = () => {
  const [channel, setChannel] = useState(null);

  const navigate = useNavigate();
  const { username } = useParams();

  useEffect(() => {
    const fetchChannel = async () => {
      try {
        const response = await getChannel(username);
        setChannel(response.data);
      } catch (error) {
        console.log(error);
        navigate(`/create-channel/${username}`);
      }
    };

    fetchChannel();
  }, [username, navigate]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this channel?",
    );

    if (!confirmDelete) return;

    try {
      await deleteChannel(channel._id);
      navigate("/");
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  const channelName = channel ? channel.channelname : "Channel Name";
  const channelDescription = channel ? channel.channeldescription : "";

  const profileImage =
    channel && channel.avatar ? channel.avatar : defaultProfile;

  const channelBanner =
    channel && channel.channelbanner ? channel.channelbanner : defaultBanner;


  return (
    <div className="w-full px-2">
      <img
        src={channelBanner}
        alt="Channel Banner"
        className="w-full h-20 sm:h-30 md:h-40 lg:h-50 xl:h-60 object-cover rounded-xl"
      />

      <div className="flex flex-col md:flex-row md:items-center gap-6 px-4 py-6 justify-between">
        <div className="flex gap-4 justify-between">
          <img
            src={profileImage}
            alt="profile"
            className="w-20 h-20 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full object-cover self-center md:self-start"
          />

          <div className="text-left">
            <h2 className="text-2xl md:text-3xl font-bold">{channelName}</h2>

            <h3 className="text-sm text-gray-600">@{username}</h3>

            <p className="font-semibold text-sm text-gray-600 mt-2">
              {channelDescription}
            </p>

            <p className="text-sm text-gray-500 mt-2">
              0 subscribers • 0 videos
            </p>
          </div>
        </div>

        <div className="flex justify-center  sm:flex-row md:flex-col gap-2">
          <button
            onClick={() => navigate(`/edit-channel/${username}`)}
            className="w-20 px-2 py-1 bg-black text-white rounded-full hover:bg-gray-300 hover:text-black transition"
          >
            Edit
          </button>

          <button
            onClick={handleDelete}
            className="w-20 px-2 py-1 bg-red-600 text-white rounded-full hover:bg-red-700 transition"
          >
            Delete
          </button>
        </div>
      </div>

      <div className="px-4 md:px-10 py-6">
        <ChannelVideos uploader={username} />
      </div>
    </div>
  );
};

export default Channel;
