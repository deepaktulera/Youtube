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
        className="w-full h-20 sm:h-30 md:h-40 lg:h-50 xl:h-60 object-cover rounded-xl"
      />

      {/* Channel information section */}
      <div className="flex flex-col md:flex-row md:items-center gap-6 px-4 py-6 justify-between">
        <div className="flex gap-4 justify-between">
          {/* Channel profile image */}
          <img
            src={profileImage}
            alt="profile"
            className="w-20 h-20 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full object-cover self-center md:self-start"
          />

          {/* Channel details */}
          <div className="text-left">
            <h2 className="text-2xl md:text-3xl font-bold">{channelName}</h2>

            <h3 className="text-sm text-gray-600">@{username}</h3>

            <p className="font-semibold text-sm text-gray-600 mt-2">
              {channelDescription}
            </p>

            {/* Channel statistics */}
            <p className="text-sm text-gray-500 mt-2">
              0 subscribers • 0 videos
            </p>
          </div>
        </div>

        {/* Channel action buttons */}
        <div className="flex justify-center sm:flex-row md:flex-col gap-2">
          {/* Edit channel button */}
          <button
            onClick={() => navigate(`/edit-channel/${username}`)}
            className="w-20 px-2 py-1 bg-black text-white rounded-full hover:bg-gray-300 hover:text-black transition"
          >
            Edit
          </button>

          {/* Delete channel button */}
          <button
            onClick={handleDelete}
            className="w-20 px-2 py-1 bg-red-600 text-white rounded-full hover:bg-red-700 transition"
          >
            Delete
          </button>
        </div>
      </div>

      {/* Uploaded videos section */}
      <div className="px-1 md:px-5 py-6">
        <ChannelVideosGrid uploader={username} />
      </div>
    </div>
  );
};

export default Channel;
