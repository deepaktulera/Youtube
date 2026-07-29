import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getChannel, deleteChannel } from "../services/channelService";
import defaultProfile from "../assets/icons/default_profile.svg";
import defaultBanner from "../assets/icons/channel_banner.svg";
import ChannelVideosGrid from "../components/ChannelVideosGrid";

// Displays a user's channel page
const Channel = () => {
  // Store channel details
  const [channel, setChannel] = useState(null);

  const navigate = useNavigate();

  // Get username from URL parameters
  const { username } = useParams();

  // Fetch channel data on username change
  useEffect(() => {
    const fetchChannel = async () => {
      try {
        // Get channel details from API
        const response = await getChannel(username);

        // Save channel data
        setChannel(response.data);
      } catch (error) {
        console.log(error);

        // Redirect if channel does not exist
        navigate(`/create-channel/${username}`);
      }
    };

    fetchChannel();
  }, [username, navigate]);

  // Delete channel handler
  const handleDelete = async () => {
    // Confirm before deleting channel
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this channel?",
    );

    if (!confirmDelete) return;

    try {
      // Delete channel from API
      await deleteChannel(channel._id);

      // Redirect after deletion
      navigate("/");
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  // Channel display name
  const channelName = channel ? channel.channelname : "Channel Name";

  // Channel description
  const channelDescription = channel ? channel.channeldescription : "";

  // Channel profile image
  const profileImage =
    channel && channel.avatar ? channel.avatar : defaultProfile;

  // Channel banner image
  const channelBanner =
    channel && channel.channelbanner ? channel.channelbanner : defaultBanner;

  return (
    <div className="w-full px-2">
      {/* Channel banner image */}
      <img
        src={channelBanner}
        alt="Channel Banner"
        className="w-full h-36 sm:h-44 md:h-56 lg:h-64 xl:h-72 rounded-2xl object-cover shadow-lg"
      />

      {/* Channel information section */}
      <div className="flex md:flex-row md:items-center md:justify-between gap-8 px-2 md:px-6 py-4">
        <div className="flex w-full sm:flex-row items-center justify-between md:justify-normal sm:items-start gap-6">

          <img
            src={profileImage}
            alt="profile"
            className="h-24 w-24 sm:h-28 sm:w-28 md:h-32 md:w-32 lg:h-36 lg:w-36 rounded-full border-4 border-white shadow-2xl object-cover"
          />

          <div className="text-center sm:text-left">

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              {channelName}
            </h1>

            <p className="text-gray-500 text-sm md:text-base">
              @{username}
            </p>

            <p className="max-w-2xl text-gray-700 leading-7">
              {channelDescription}
            </p>

            <div className="flex flex-wrap justify-center sm:justify-start gap-5 text-sm text-gray-500">
              <span>👥 <strong>0</strong> Subscribers</span>
              <span>🎥 <strong>0</strong> Videos</span>
            </div>

          </div>
        </div>

        {/* Channel action buttons */}
        <div className="hidden md:flex flex-row justify-center md:flex-col gap-3">
          {/* Edit channel button */}
          <button
            onClick={() => navigate(`/edit-channel/${username}`)}
            className="px-6 py-2 rounded-full bg-black text-white font-medium hover:bg-gray-800 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Edit
          </button>

          {/* Delete channel button */}
          <button
            onClick={handleDelete}
            className="px-6 py-2 rounded-full bg-red-600 text-white font-medium hover:bg-red-700 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Delete
          </button>
        </div>
      </div>

      {/* Uploaded videos section */}
      <div className="px-1 md:px-5 py-6">
        <div className="pt-4 border-t"></div>

        <h2 className="mb-6 text-2xl font-bold">
          Uploaded Videos
        </h2>
        <ChannelVideosGrid uploader={username} />
      </div>
    </div >
  );
};

export default Channel;
