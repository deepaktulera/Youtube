import Video from "../models/Video.js";
import Channel from "../models/Channel.js";

export const fetchVideos = async (req, res) => {
  try {
    const videos = await Video.find();

    res.status(200).json(videos);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const fetchVideo = async (req, res) => {
  try {
    const { id } = req.params;

    const video = await Video.findById(id);

    if (!video) {
      return res.status(404).json({
        message: "Video not found",
      });
    }

    res.status(200).json(video);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const uploadVideo = async (req, res) => {
  try {
    const { title, description, thumbnailUrl, videoUrl, category, uploader } =
      req.body;

    // Find uploader's channel
    const channel = await Channel.findOne({ username: uploader });

    if (!channel) {
      return res.status(404).json({
        message: "Channel not found. Please create a channel first.",
      });
    }

    const newVideo = await Video.create({
      title,
      description,
      thumbnailUrl,
      videoUrl,
      category,
      uploader,
      channel: channel.channelname, // Automatically use actual channel name
    });

    res.status(201).json({
      message: "Video uploaded successfully",
      video: newVideo,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const updateVideo = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedVideo = await Video.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedVideo) {
      return res.status(404).json({
        message: "Video not found",
      });
    }

    res.status(200).json({
      message: "Video updated successfully",
      video: updatedVideo,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getChannelVideos = async (req, res) => {
  try {
    const { uploader } = req.params;

    const videos = await Video.find({ uploader });

    res.status(200).json(videos);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const likeVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);

    if (!video) {
      return res.status(404).json({
        message: "Video not found",
      });
    }

    const userId = req.user.id;

    // If already liked, remove the like
    if (video.likes.includes(userId)) {
      video.likes.pull(userId);
    } else {
      // Add like
      video.likes.push(userId);

      // Remove dislike if it exists
      video.dislikes.pull(userId);
    }

    await video.save();

    res.status(200).json({
      message: "Like updated successfully",
      likes: video.likes.length,
      dislikes: video.dislikes.length,
      liked: video.likes.includes(userId),
      disliked: video.dislikes.includes(userId),
      video,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const dislikeVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);

    if (!video) {
      return res.status(404).json({
        message: "Video not found",
      });
    }

    const userId = req.user.id;

    // If already disliked, remove the dislike
    if (video.dislikes.includes(userId)) {
      video.dislikes.pull(userId);
    } else {
      // Add dislike
      video.dislikes.push(userId);

      // Remove like if it exists
      video.likes.pull(userId);
    }

    await video.save();

    res.status(200).json({
      message: "Dislike updated successfully",
      video,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const updateViews = async (req, res) => {
  try {
    const video = await Video.findByIdAndUpdate(
      req.params.id,
      {
        $inc: {
          views: 1,
        },
      },
      {
        new: true,
      },
    );

    if (!video) {
      return res.status(404).json({
        message: "Video not found",
      });
    }

    res.status(200).json({
      message: "View updated successfully",
      video,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteVideo = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);

    const deletedVideo = await Video.findByIdAndDelete(id);

    if (!deletedVideo) {
      return res.status(404).json({
        message: "Video not found",
      });
    }

    res.status(200).json({
      message: "Video deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
