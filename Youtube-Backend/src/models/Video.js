import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    thumbnailUrl: {
      type: String,
      required: true,
    },

    videoUrl: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
      elem: [
        "All",
        "Music",
        "Gaming",
        "News",
        "Sports",
        "Education",
        "Programming",
        "Entertainment",
      ],
    },

    channel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Channel",
      required: true,
    },

    uploader: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    views: {
      type: Number,
      default: 0,
    },

    likes: {
      type: Number,
      default: 0,
    },

    dislikes: {
      type: Number,
      default: 0,
    },

    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Video = mongoose.model("Video", VideoSchema);

export default Video;