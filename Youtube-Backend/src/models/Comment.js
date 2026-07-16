import mongoose from "mongoose";

// Create comment schema
const CommentSchema = new mongoose.Schema(
  {
    // Reference to the user who wrote the comment
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Reference to the video
    video: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Video",
      required: true,
    },

    // Comment text
    text: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    // Automatically add createdAt and updatedAt
    timestamps: true,
  }
);

// Create Comment model
const Comment = mongoose.model("Comment", CommentSchema);

// Export Comment model
export default Comment;