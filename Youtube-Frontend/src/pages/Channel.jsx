import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getChannel } from "../services/channelService";
import ChannelVideos from "../components/ChannelVideos";
import defaultProfile from "../assets/icons/default_profile.svg";

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

  const channelName = channel ? channel.channelname : "Channel Name";

  const profileImage = channel && channel.avatar
    ? channel.avatar
    : defaultProfile;

  return (
    <div className="w-full">
      <div className="flex items-center gap-4 px-4 py-6">
        <img
          src={profileImage}
          alt="profile"
          className="h-32 w-32 rounded-full object-cover"
        />

        <div>
          <h2 className="text-3xl font-bold">
            {channelName}
          </h2>

          <h3 className="text-gray-600">
            @{username}
          </h3>

          <p className="text-sm text-gray-500 mt-2">
            0 subscribers • 0 videos
          </p>

          <button className="mt-4 px-5 py-2 bg-black text-white rounded-full">
            Edit Channel
          </button>
        </div>
      </div>

      <div className="px-10 py-6">
        <ChannelVideos uploader={username} />
      </div>
    </div>
  );
};

export default Channel;