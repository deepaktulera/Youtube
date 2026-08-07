import Video from "../models/Video.js";
import Channel from "../models/Channel.js";

// Get all videos
export const fetchVideos = async (req, res) => {
  try {
    // Get search query
    const { search } = req.query;

    // Create filter object
    let filter = {};

    // Apply search filter
    if (search) {
      filter.title = {
        $regex: search,
        $options: "i", // Case insensitive search
      };
    }

    // Fetch videos
    const videos = await Video.find(filter);

    // Return videos
    res.status(200).json(videos);
  } catch (error) {
    // Handle server error
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get single video
export const fetchVideo = async (req, res) => {
  try {
    // Get video ID
    const { id } = req.params;

    // Find video
    const video = await Video.findById(id);

    // Check if video exists
    if (!video) {
      return res.status(404).json({
        message: "Video not found",
      });
    }

    // Return video
    res.status(200).json(video);
  } catch (error) {
    // Handle server error
    res.status(500).json({
      message: error.message,
    });
  }
};

// Upload a new video
export const uploadVideo = async (req, res) => {
  try {
    const { title, description, category, uploader } = req.body;

    // Get uploaded file URLs
    const thumbnailUrl = req.files.thumbnail[0].path;
    const videoUrl = req.files.video[0].path;

    // Find uploader's channel
    const channel = await Channel.findOne({ username: uploader });

    if (!channel) {
      return res.status(404).json({
        message: "Channel not found",
      });
    }

    // Save video to MongoDB
    const newVideo = await Video.create({
      title,
      description,
      thumbnailUrl,
      videoUrl,
      category,
      channel: channel.channelname, // or channel.username (see note below)
      uploader,
    });

    res.status(201).json({
      success: true,
      message: "Video uploaded successfully",
      video: newVideo,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update video
export const updateVideo = async (req, res) => {
  try {
    const { id } = req.params;

    const video = await Video.findById(id);

    if (!video) {
      return res.status(404).json({
        message: "Video not found",
      });
    }

    const {
      title,
      description,
      category,
    } = req.body;

    if (title) video.title = title;
    if (description) video.description = description;
    if (category) video.category = category;

    // Replace thumbnail only if a new one was uploaded
    if (req.files?.thumbnail) {
      video.thumbnailUrl = req.files.thumbnail[0].path;
    }

    // Replace video only if a new one was uploaded
    if (req.files?.video) {
      video.videoUrl = req.files.video[0].path;
    }

    await video.save();

    res.status(200).json({
      success: true,
      message: "Video updated successfully",
      video,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all videos of a channel
export const getChannelVideos = async (req, res) => {
  try {
    // Get uploader username
    const { uploader } = req.params;

    // Find videos
    const videos = await Video.find({ uploader });

    // Return videos
    res.status(200).json(videos);
  } catch (error) {
    // Handle server error
    res.status(500).json({
      message: error.message,
    });
  }
};

// Like or unlike a video
export const likeVideo = async (req, res) => {
  try {
    // Find video
    const video = await Video.findById(req.params.id);

    // Check if video exists
    if (!video) {
      return res.status(404).json({
        message: "Video not found",
      });
    }

    // Get logged-in user ID
    const userId = req.user.id;

    // Remove like if already liked
    if (video.likes.includes(userId)) {
      video.likes.pull(userId);
    } else {
      // Add like
      video.likes.push(userId);

      // Remove dislike
      video.dislikes.pull(userId);
    }

    // Save changes
    await video.save();

    // Return updated data
    res.status(200).json({
      message: "Like updated successfully",
      likes: video.likes.length,
      dislikes: video.dislikes.length,
      liked: video.likes.includes(userId),
      disliked: video.dislikes.includes(userId),
      video,
    });
  } catch (error) {
    // Handle server error
    res.status(500).json({
      message: error.message,
    });
  }
};

// Dislike or remove dislike
export const dislikeVideo = async (req, res) => {
  try {
    // Find video
    const video = await Video.findById(req.params.id);

    // Check if video exists
    if (!video) {
      return res.status(404).json({
        message: "Video not found",
      });
    }

    // Get logged-in user ID
    const userId = req.user.id;

    // Remove dislike if already disliked
    if (video.dislikes.includes(userId)) {
      video.dislikes.pull(userId);
    } else {
      // Add dislike
      video.dislikes.push(userId);

      // Remove like
      video.likes.pull(userId);
    }

    // Save changes
    await video.save();

    // Return updated data
    res.status(200).json({
      message: "Dislike updated successfully",
      video,
    });
  } catch (error) {
    // Handle server error
    res.status(500).json({
      message: error.message,
    });
  }
};

// Increase video views
export const updateViews = async (req, res) => {
  try {
    // Increment view count
    const video = await Video.findByIdAndUpdate(
      req.params.id,
      {
        $inc: {
          views: 1,
        },
      },
      {
        new: true,
      }
    );

    // Check if video exists
    if (!video) {
      return res.status(404).json({
        message: "Video not found",
      });
    }

    // Return updated video
    res.status(200).json({
      message: "View updated successfully",
      video,
    });
  } catch (error) {
    // Handle server error
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete video
export const deleteVideo = async (req, res) => {
  try {
    // Get video ID
    const { id } = req.params;

    // Print ID for debugging
    console.log(id);

    // Delete video
    const deletedVideo = await Video.findByIdAndDelete(id);

    // Check if video exists
    if (!deletedVideo) {
      return res.status(404).json({
        message: "Video not found",
      });
    }

    // Return success response
    res.status(200).json({
      message: "Video deleted successfully",
    });
  } catch (error) {
    // Handle server error
    res.status(500).json({
      message: error.message,
    });
  }
};