import Video from "../models/Video.js";
import Comment from "../models/Comment.js";

// Add a new comment
export const addComment = async (req, res) => {
  try {
    // Get video ID
    const { id } = req.params;

    // Get comment text
    const { text } = req.body;

    // Check if comment text is provided
    if (!text) {
      return res.status(400).json({
        message: "Comment text is required",
      });
    }

    // Find the video
    const video = await Video.findById(id);

    // Check if video exists
    if (!video) {
      return res.status(404).json({
        message: "Video not found",
      });
    }

    // Create a new comment
    const newComment = await Comment.create({
      user: req.user.id,
      video: id,
      text,
    });

    // Add comment ID to video
    video.comments.push(newComment._id);

    // Save updated video
    await video.save();

    // Return success response
    res.status(201).json({
      message: "Comment added successfully",
      comment: newComment,
    });
  } catch (err) {
    // Handle server error
    res.status(500).json({
      message: err.message,
    });
  }
};

// Get all comments of a video
export const getComments = async (req, res) => {
  try {
    // Get video ID
    const { id } = req.params;

    // Find comments for the video
    const comments = await Comment.find({ video: id })
      .populate("user", "name username")
      .sort({ createdAt: -1 });

    // Return comments
    res.status(200).json(comments);
  } catch (error) {
    // Handle server error
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update comment
export const updateComment = async (req, res) => {
  try {
    // Get comment ID
    const { id } = req.params;

    // Get updated text
    const { text } = req.body;

    // Find comment
    const comment = await Comment.findById(id);

    // Check if comment exists
    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found",
      });
    }

    // Check if user owns the comment
    if (comment.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this comment",
      });
    }

    // Update comment text
    comment.text = text || comment.text;

    // Save updated comment
    await comment.save();

    // Return success response
    res.status(200).json({
      success: true,
      message: "Comment updated successfully",
      comment,
    });
  } catch (error) {
    // Print error
    console.error(error);

    // Handle server error
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Delete comment
export const deleteComment = async (req, res) => {
  try {
    // Get comment ID
    const { id } = req.params;

    // Find comment
    const comment = await Comment.findById(id);

    // Check if comment exists
    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found",
      });
    }

    // Check if user owns the comment
    if (comment.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this comment",
      });
    }

    // Delete comment
    await Comment.findByIdAndDelete(id);

    // Return success response
    res.status(200).json({
      success: true,
      message: "Comment deleted successfully",
    });
  } catch (error) {
    // Print error
    console.error(error);

    // Handle server error
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};