import React, { useEffect, useState } from "react";
import { EllipsisVertical } from "lucide-react";
import { toast } from "react-toastify";
import {
  getComments,
  addComment,
  updateComment,
  deleteComment,
} from "../services/commentServices";
import { useNavigate } from "react-router-dom";

const CommentSection = ({ videoId }) => {
  // Logged in user id
  const currentUserId = localStorage.getItem("id");

  const navigate = useNavigate();

  // Store all comments
  const [comments, setComments] = useState([]);

  // New comment text
  const [text, setText] = useState("");

  // Edit comment states
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

  // Controls the menu visibility
  const [showMenu, setShowMenu] = useState(false);

  // Stores which comment's menu is open
  const [selectedComment, setSelectedComment] = useState(null);

  // Fetch comments whenever video changes
  useEffect(() => {
    fetchComments();
  }, [videoId]);

  // Get all comments
  const fetchComments = async () => {
    try {
      const response = await getComments(videoId);
      setComments(response.data);
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  // Add new comment
  const handleAddComment = async () => {
    if (!text.trim()) return toast.warning("Please enter a comment!");

    try {
      await addComment(videoId, text);

      setText("");
      fetchComments();
      toast.success("Comment added successfully!");
    } catch (error) {
      toast.warning("Please login first!");
      navigate("/login");
    }
  };

  // Update comment
  const handleUpdateComment = async (id) => {
    if (!editingText.trim()) return;

    try {
      await updateComment(id, editingText);

      setEditingId(null);
      setEditingText("");
      fetchComments();
      toast.success("Comment updated successfully!");
    } catch (error) {
      toast.warning("Please login first!");
      navigate("/login");
    }
  };

  // Delete comment
  const handleDeleteComment = async (id) => {
    try {
      await deleteComment(id);

      fetchComments();
      toast.success("Comment deleted successfully!");
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  return (
    <div>
      {/* Total comments */}
      <h2 className="mb-5 text-xl font-bold">{comments.length} Comments</h2>

      {/* Add Comment */}
      <div className="mb-8">
        <textarea
          rows={1}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a comment..."
          className="w-full rounded border-b border-r focus:outline-none focus:ring-2 focus:ring-blue-500 p-3"
        />

        <button
          onClick={handleAddComment}
          className="mt-3 rounded bg-blue-600 px-2 py-1 text-white"
        >
          Comment
        </button>
      </div>

      {/* Show all comments */}
      <div className="h-40 overflow-y-auto">
        {comments.map((comment) => (
          <div
            key={comment._id}
            className="mb-3 border-b border-b-lime-800 rounded-xl p-2"
          >
            {/* Username */}
            <h3 className="font-semibold">{comment.user.name}</h3>

            {/* Edit Mode */}
            {editingId === comment._id ? (
              <div>
                <input
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                  className="w-full rounded border p-2"
                />

                <button
                  onClick={() => handleUpdateComment(comment._id)}
                  className="mr-3 mt-3 rounded bg-green-600 px-4 py-2 text-white"
                >
                  Save
                </button>

                <button
                  onClick={() => setEditingId(null)}
                  className="mt-3 rounded bg-gray-500 px-4 py-2 text-white"
                >
                  Cancel
                </button>
              </div>
            ) : (
              // Normal View
              <div className="relative flex justify-between">
                <p>{comment.text}</p>

                {/* Show menu only for comment owner */}
                {comment.user?._id === currentUserId && (
                  <div className="relative">
                    {/* Three-dot icon */}
                    <EllipsisVertical
                      className="cursor-pointer"
                      onClick={() => {
                        // If same menu is open, close it
                        if (showMenu && selectedComment === comment._id) {
                          setShowMenu(false);
                          setSelectedComment(null);
                        } else {
                          // Otherwise open this comment's menu
                          setShowMenu(true);
                          setSelectedComment(comment._id);
                        }
                      }}
                    />

                    {/* Show menu */}
                    {showMenu && selectedComment === comment._id && (
                      <div className="absolute right-0 mt-2 w-24 rounded border bg-white shadow">
                        {/* Edit Button */}
                        <button
                          className="block w-full px-3 py-2 text-left hover:bg-gray-100"
                          onClick={() => {
                            setEditingId(comment._id);
                            setEditingText(comment.text);

                            setShowMenu(false);
                            setSelectedComment(null);
                          }}
                        >
                          Edit
                        </button>

                        {/* Delete Button */}
                        <button
                          className="block w-full px-3 py-2 text-left text-red-600 hover:bg-gray-100"
                          onClick={() => {
                            handleDeleteComment(comment._id);

                            setShowMenu(false);
                            setSelectedComment(null);
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
