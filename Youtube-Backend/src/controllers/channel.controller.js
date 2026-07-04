import Channel from "../models/Channel.js";

export const createChannel = async (req, res) => {
  try {
    const { channelname, channeldescription, avatar, channelbanner, owner } =
      req.body;

    const newChannel = await Channel.create({
      channelname,
      channeldescription,
      avatar,
      channelbanner,
      owner,
    });

    res.status(201).json(newChannel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const showChannel = async (req, res) => {
  try {
    const { username } = req.params;

    const channel = await Channel.findOne({ username });

    if (!channel) {
      return res.status(404).json({ message: "Channel doesn't exist" });
    }

    res.status(200).json(channel);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateChannel = async (req, res) => {
  try {
    const { id } = req.params;

    const channel = await Channel.findById(id);

    if (!channel) {
      return res.status(404).json({ message: "Channel doesn't exist" });
    }

    const { channelname, username, channeldescription, avatar, channelbanner } =
      req.body;

    if (channelname !== undefined) channel.channelname = channelname;
    if (username !== undefined) channel.username = username;
    if (channeldescription !== undefined)
      channel.channeldescription = channeldescription;
    if (avatar !== undefined) channel.avatar = avatar;
    if (channelbanner !== undefined) channel.channelbanner = channelbanner;

    await channel.save();

    res.status(200).json(channel);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteChannel = async (req, res) => {
  try {
    const { id } = req.params;

    const channel = await Channel.findByIdAndDelete(id);

    if (!channel) {
      return res.status(404).json({ message: "Channel doesn't exist" });
    }

    res.status(200).json({
      message: "Channel deleted successfully",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
