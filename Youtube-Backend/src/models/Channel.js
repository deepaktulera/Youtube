import mongoose from "mongoose";

// Channel schema
const channelSchema = new mongoose.Schema(
  {
    // Channel name
    channelname: {
      type: String,
      required: true,
      trim: true,
    },

    // Username of the channel owner
    username: {
      type: String,
      required: true,
      trim: true,
    },

    // Channel description
    channeldescription: {
      type: String,
      required: true,
      trim: true,
    },

    // Channel profile image
    avatar: {
      type: String,
      default: "",
    },

    // Channel banner image
    channelbanner: {
      type: String,
      default: "",
    },

    // Reference to the channel owner
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    // Total number of subscribers
    subscribers: {
      type: Number,
      default: 0,
    },
  },
  {
    // Automatically add createdAt and updatedAt
    timestamps: true,
  }
);

// Create Channel model
const Channel = mongoose.model("Channel", channelSchema);

// Export Channel model
export default Channel;