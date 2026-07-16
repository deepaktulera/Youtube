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
  // Get logged-in user id
  const currentUserId = localStorage.getItem("id");

  const navigate = useNavigate();

  // Store comments list
  const [comments, setComments] = useState([]);

  // Store new comment text
  const [text, setText] = useState("");

  // Store edit comment data
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

  // Control comment menu visibility
  const [showMenu, setShowMenu] = useState(false);

  // Store selected comment menu id
  const [selectedComment, setSelectedComment] = useState(null);

  // Fetch comments when video changes
  useEffect(() => {
    fetchComments();
  }, [videoId]);

  // Fetch comments from API
  const fetchComments = async () => {
    try {
      const response = await getComments(videoId);
      setComments(response.data);
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  // Add a new comment
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

  // Update existing comment
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
      {/* Display total comments count */}
      <h2 className="mb-5 text-xl font-bold">{comments.length} Comments</h2>

      {/* Comment input section */}
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

      {/* Render comments */}
      <div className="h-40 overflow-y-auto">
        {comments.map((comment) => (
          <div
            key={comment._id}
            className="mb-3 border-b border-b-lime-800 rounded-xl p-2"
          >
            {/* Comment author */}
            <h3 className="font-semibold">{comment.user.name}</h3>

            {/* Edit comment section */}
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
              // Display comment content
              <div className="relative flex justify-between">
                <p>{comment.text}</p>

                {/* Show actions only for comment owner */}
                {comment.user?._id === currentUserId && (
                  <div className="relative">
                    {/* Open comment menu */}
                    <EllipsisVertical
                      className="cursor-pointer"
                      onClick={() => {
                        if (showMenu && selectedComment === comment._id) {
                          // Close current menu
                          setShowMenu(false);
                          setSelectedComment(null);
                        } else {
                          // Open selected comment menu
                          setShowMenu(true);
                          setSelectedComment(comment._id);
                        }
                      }}
                    />

                    {/* Comment action menu */}
                    {showMenu && selectedComment === comment._id && (
                      <div className="absolute right-0 mt-2 w-24 rounded border bg-white shadow">
                        {/* Edit action */}
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

                        {/* Delete action */}
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
