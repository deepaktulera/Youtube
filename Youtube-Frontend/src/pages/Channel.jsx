import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getChannel } from "../services/channelService";
import ChannelVideos from "../components/ChannelVideos";

const Channel = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [channel, setChannel] = useState(null);

  const { username } = useParams();  

  useEffect(() => {
    const fetchChannel = async () => {
      try {
        const res = await getChannel(username);
        setChannel(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    if (username) {
      fetchChannel();
    }
  }, [username]);

  const user = channel?.user || "username";
  const name = channel?.channelname || "Channel Name";

  return (
    <div className="w-full">
      <div className="flex items-center gap-4 px-4 py-6">
        <img
          className="h-32 w-32 rounded-full object-cover"
          src={channel?.avatar}
          alt="profile"
        />

        <div>
          <h2 className="text-3xl font-bold">{name}</h2>
          <h3 className="text-gray-600">@{username}</h3>

          <p className="text-sm text-gray-500 mt-2">0 subscribers • 0 videos</p>

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
