import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getChannel, deleteChannel } from "../services/channelService";
import defaultProfile from "../assets/icons/default_profile.svg";
import defaultBanner from "../assets/icons/channel_banner.svg";
import ChannelVideosGrid from "../components/ChannelVideosGrid";

// Displays a user's channel page
const Channel = () => {
  // Store channel information
  const [channel, setChannel] = useState(null);

  const navigate = useNavigate();

  // Get username from the URL
  const { username } = useParams();

  // Fetch channel details whenever the username changes
  useEffect(() => {
    const fetchChannel = async () => {
      try {
        // Fetch channel information from the backend
        const response = await getChannel(username);

        // Save channel data into state
        setChannel(response.data);
      } catch (error) {
        console.log(error);

        // Redirect user to create channel page if channel doesn't exist
        navigate(`/create-channel/${username}`);
      }
    };

    fetchChannel();
  }, [username, navigate]);

  // Delete the current channel
  const handleDelete = async () => {
    // Ask for confirmation before deleting
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this channel?",
    );

    if (!confirmDelete) return;

    try {
      // Delete channel from the backend
      await deleteChannel(channel._id);

      // Navigate back to home page
      navigate("/");
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  // Channel name with fallback value
  const channelName = channel ? channel.channelname : "Channel Name";

  // Channel description with fallback value
  const channelDescription = channel ? channel.channeldescription : "";

  // Display uploaded profile image or default profile image
  const profileImage =
    channel && channel.avatar ? channel.avatar : defaultProfile;

  // Display uploaded banner image or default banner image
  const channelBanner =
    channel && channel.channelbanner ? channel.channelbanner : defaultBanner;

  return (
    <div className="w-full px-2">
      {/* Channel Banner */}
      <img
        src={channelBanner}
        alt="Channel Banner"
        className="w-full h-20 sm:h-30 md:h-40 lg:h-50 xl:h-60 object-cover rounded-xl"
      />

      {/* Channel Information */}
      <div className="flex flex-col md:flex-row md:items-center gap-6 px-4 py-6 justify-between">
        <div className="flex gap-4 justify-between">
          {/* Profile Image */}
          <img
            src={profileImage}
            alt="profile"
            className="w-20 h-20 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full object-cover self-center md:self-start"
          />

          {/* Channel Details */}
          <div className="text-left">
            <h2 className="text-2xl md:text-3xl font-bold">{channelName}</h2>

            <h3 className="text-sm text-gray-600">@{username}</h3>

            <p className="font-semibold text-sm text-gray-600 mt-2">
              {channelDescription}
            </p>

            {/* Subscriber and Video Count */}
            <p className="text-sm text-gray-500 mt-2">
              0 subscribers • 0 videos
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center sm:flex-row md:flex-col gap-2">
          {/* Edit Channel Button */}
          <button
            onClick={() => navigate(`/edit-channel/${username}`)}
            className="w-20 px-2 py-1 bg-black text-white rounded-full hover:bg-gray-300 hover:text-black transition"
          >
            Edit
          </button>

          {/* Delete Channel Button */}
          <button
            onClick={handleDelete}
            className="w-20 px-2 py-1 bg-red-600 text-white rounded-full hover:bg-red-700 transition"
          >
            Delete
          </button>
        </div>
      </div>

      {/* Display all uploaded videos */}
      <div className="px-1 md:px-5 py-6">
        <ChannelVideosGrid uploader={username} />
      </div>
    </div>
  );
};

export default Channel;
