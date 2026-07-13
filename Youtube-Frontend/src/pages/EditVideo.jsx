import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getVideo, updateVideo } from "../services/videoService";

// Page for editing an existing channel
const EditVideo = () => {
    // Get username from the URL
    const { id } = useParams();

    const navigate = useNavigate();

    // Store form data
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        thumbnail: "",
        videoUrl: "",
        category: ""
    });

    // Fetch channel details when the component loads
    useEffect(() => {
        const fetchVideo = async () => {
            try {
                // Get existing channel information
                const response = await getVideo(id);

                // Populate the form with existing data
                setFormData({
                    title: response.data.title,
                    description: response.data.description,
                    thumbnail: response.data.thumbnailUrl,
                    videoUrl: response.data.videoUrl,
                    category: response.data.category,
                });
            } catch (error) {
                console.log(error);
            }
        };

        fetchVideo();
    }, [id]);

    // Update form data when an input changes
    const handleChange = ({ target }) => {
        const { name, value } = target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Submit updated channel information
    const handleSubmit = async (e) => {
        // Prevent page refresh
        e.preventDefault();

        try {
            // Send updated data to the backend
            await updateVideo(id, formData);

            toast.success("Video updated successfully!");
            // Navigate back to the channel page
            navigate(`/editVideo/${id}`);
        } catch (error) {
            // Display any API errors
            toast.error("Video update failed!");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            {/* Edit Channel Form Container */}
            <div className="w-full max-w-xl rounded-xl bg-gray-50 p-6 shadow-2xl">
                <h1 className="mb-6 text-center text-2xl font-bold">
                    Edit Video
                </h1>

                {/* Edit Channel Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Channel Name */}
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Title"
                        className="w-full rounded border p-3 outline-none"
                        required
                    />

                    {/* Channel Description */}
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Description"
                        rows={4}
                        className="w-full rounded border p-3 outline-none resize-none"
                        required
                    />

                    {/* Avatar URL */}
                    <input
                        type="text"
                        name="thumbnail"
                        value={formData.thumbnail}
                        onChange={handleChange}
                        placeholder="Thumbnail"
                        className="w-full rounded border p-3 outline-none"
                    />

                    {/* Banner URL */}
                    <input
                        type="text"
                        name="videoUrl"
                        value={formData.videoUrl}
                        onChange={handleChange}
                        placeholder="Video URL"
                        className="w-full rounded border p-3 outline-none"
                    />

                    {/* Video Category */}
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full rounded-xl border p-3 outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    >
                        <option value="">Select Category</option>
                        <option value="Music">Music</option>
                        <option value="Gaming">Gaming</option>
                        <option value="Education">Education</option>
                        <option value="Programming">Programming</option>
                        <option value="Sports">Sports</option>
                        <option value="News">News</option>
                        <option value="Entertainment">Entertainment</option>
                    </select>

                    {/* Save Button */}
                    <button
                        type="submit"
                        className="w-full rounded bg-black py-3 text-white hover:bg-gray-900"
                    >
                        Save Changes
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditVideo;