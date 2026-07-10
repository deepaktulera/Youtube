import Video from "../models/Video.js";
import Comment from "../models/Comment.js";

export const addComment = async (req, res) => {
  try {
    const { id } = req.params; // Video ID
    const { text } = req.body; // Comment text

    // Check if comment text is provided
    if (!text) {
      return res.status(400).json({
        message: "Comment text is required",
      });
    }

    // Find the video
    const video = await Video.findById(id);

    if (!video) {
      return res.status(404).json({
        message: "Video not found",
      });
    }

    // Create the comment
    const newComment = await Comment.create({
      user: req.user.id,
      video: id,
      text,
    });

    // Add comment ID to the video's comments array
    video.comments.push(newComment._id);

    // Save the updated video
    await video.save();

    res.status(201).json({
      message: "Comment added successfully",
      comment: newComment,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const getComments = async (req, res) => {
  try {
    const { id } = req.params;

    const comments = await Comment.find({ video: id })
      .populate("user", "name username")
      .sort({ createdAt: -1 });

    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Comment
export const updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { text } = req.body;

    // Find the comment
    const comment = await Comment.findById(id);

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found",
      });
    }

    // Check if the logged-in user owns the comment
    if (comment.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this comment",
      });
    }

    // Update comment text
    comment.text = text || comment.text;

    await comment.save();

    res.status(200).json({
      success: true,
      message: "Comment updated successfully",
      comment,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Delete Comment
export const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the comment
    const comment = await Comment.findById(id);

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found",
      });
    }

    // Check ownership
    if (comment.user.toString() !== req.user.id){
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this comment",
      });
    }

    await Comment.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Comment deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
