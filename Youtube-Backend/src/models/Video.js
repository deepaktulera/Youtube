import mongoose from "mongoose";

// Create video schema
const VideoSchema = new mongoose.Schema(
  {
    // Video title
    title: {
      type: String,
      required: true,
      trim: true,
    },

    // Video description
    description: {
      type: String,
      required: true,
    },

    // Video thumbnail URL
    thumbnailUrl: {
      type: String,
      required: true,
    },

    // Video file URL
    videoUrl: {
      type: String,
      required: true,
    },

    // Video category
    category: {
      type: String,
      required: true,
      enum: [
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

    // Channel name where video is uploaded
    channel: {
      type: String,
      required: true,
    },

    // Username of video uploader
    uploader: {
      type: String,
      required: true,
    },

    // Total video views
    views: {
      type: Number,
      default: 0,
    },

    // Users who liked the video
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    // Users who disliked the video
    dislikes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    // Comments added on the video
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  {
    // Automatically add createdAt and updatedAt
    timestamps: true,
  },
);

// Create Video model
const Video = mongoose.model("Video", VideoSchema);

// Export Video model
export default Video;