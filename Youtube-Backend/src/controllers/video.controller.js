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
  } catch (error) {
    res.status(500).json({
      message: error.message,
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
      uploader,
      channel,
    } = req.body;

    const newVideo = await Video.create({
      title,
      description,
      thumbnailUrl,
      videoUrl,
      category,
      uploader,
      channel,
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

    const updatedVideo = await Video.findByIdAndUpdate(
      _id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

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