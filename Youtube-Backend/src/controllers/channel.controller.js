import Channel from "../models/Channel.js";

// Create a new channel
export const createChannel = async (req, res) => {
  try {
    // Get username from URL
    const { username } = req.params;

    // Get channel details from request
    const { channelname, channeldescription } = req.body;

    const avatar = req.files?.avatar
      ? req.files.avatar[0].path
      : "";

    const channelbanner = req.files?.channelbanner
      ? req.files.channelbanner[0].path
      : "";

    // Get logged-in user ID
    const owner = req.user.id;

    // Create channel
    const newChannel = await Channel.create({
      username,
      channelname,
      channeldescription,
      avatar,
      channelbanner,
      owner,
    });

    // Send success response
    res.status(201).json({
      message: "Channel created successfully",
      channel: newChannel,
    });
  } catch (error) {
    // Print error in console
    console.log(error);

    // Send server error
    res.status(500).json({
      message: error.message,
    });
  }
};

// Show channel details
export const showChannel = async (req, res) => {
  try {
    // Get username
    const { username } = req.params;

    // Find channel
    const channel = await Channel.findOne({ username });

    // Check if channel exists
    if (!channel) {
      return res.status(404).json({
        message: "Channel doesn't exist",
      });
    }

    // Return channel data
    res.status(200).json(channel);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update channel
export const updateChannel = async (req, res) => {
  try {
    // Get username
    const { username } = req.params;

    // Find channel
    const channel = await Channel.findOne({ username });

    // Check if channel exists
    if (!channel) {
      return res.status(404).json({
        message: "Channel doesn't exist",
      });
    }

    // Check channel ownership
    if (channel.owner.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Unauthorized",
      });
    }

    // Get updated data
    const { channelname, channeldescription, avatar, channelbanner } = req.body;

    // Update channel fields
    channel.channelname = channelname;
    channel.channeldescription = channeldescription;
    channel.avatar = avatar;
    channel.channelbanner = channelbanner;

    // Save changes
    await channel.save();

    // Return updated channel
    res.status(200).json({
      message: "Channel updated successfully",
      channel,
    });
  } catch (error) {
    // Print error
    console.log(error);

    // Handle server error
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete channel
export const deleteChannel = async (req, res) => {
  try {
    // Get channel ID
    const { id } = req.params;

    // Delete channel
    const channel = await Channel.findByIdAndDelete(id);

    // Check if channel exists
    if (!channel) {
      return res.status(404).json({
        message: "Channel doesn't exist",
      });
    }

    // Return success message
    res.status(200).json({
      message: "Channel deleted successfully",
    });
  } catch (error) {
    // Handle server error
    res.status(500).json({
      message: error.message,
    });
  }
};  