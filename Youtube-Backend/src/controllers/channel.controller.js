import Channel from "../models/Channel.js";

export const createChannel = async (req, res) => {
  try {
    const { username } = req.params;

    const { channelname, channeldescription, avatar, channelbanner } = req.body;

    const owner = req.user.id;

    const newChannel = await Channel.create({
      username,
      channelname,
      channeldescription,
      avatar,
      channelbanner,
      owner,
    });

    res.status(201).json({
      message: "Channel created successfully",
      channel: newChannel,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

export const showChannel = async (req, res) => {
  try {
    const { username } = req.params;

    const channel = await Channel.findOne({ username });

    if (!channel) {
      return res.status(404).json({
        message: "Channel doesn't exist",
      });
    }

    res.status(200).json(channel);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const updateChannel = async (req, res) => {
  try {
    const { username } = req.params;

    const channel = await Channel.findOne({ username });

    if (!channel) {
      return res.status(404).json({
        message: "Channel doesn't exist",
      });
    }

    // Only owner can edit
    if (channel.owner.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Unauthorized",
      });
    }

    const { channelname, channeldescription, avatar, channelbanner } = req.body;

    channel.channelname = channelname;
    channel.channeldescription = channeldescription;
    channel.avatar = avatar;
    channel.channelbanner = channelbanner;

    await channel.save();

    res.status(200).json({
      message: "Channel updated successfully",
      channel,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteChannel = async (req, res) => {
  try {
    const { id } = req.params;

    const channel = await Channel.findByIdAndDelete(id);

    if (!channel) {
      return res.status(404).json({
        message: "Channel doesn't exist",
      });
    }

    res.status(200).json({
      message: "Channel deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
