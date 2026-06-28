import Video from "../models/Video.js";

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
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const uploadVideo = async (req, res) => {
  try {
    const {
      title,
      description,
      thumbnailUrl,
      videoUrl,
      category,
      channel,
      uploader,
      comments,
    } = req.body;

    const newVideo = new Video({
      title,
      description,
      thumbnailUrl,
      videoUrl,
      category,
      channel,
      uploader,
      comments,
    });

    await newVideo.save();

    res.status(201).json(newVideo);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
