import mongoose from "mongoose";

// Create user schema
const UserSchema = new mongoose.Schema(
  {
    // User full name
    name: {
      type: String,
      required: true,
      trim: true,
    },

    // Unique username
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    // User email address
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    // Encrypted user password
    password: {
      type: String,
      required: true,
    },
  },
  {
    // Automatically add createdAt and updatedAt
    timestamps: true,
  },
);

// Create User model
const User = mongoose.model("User", UserSchema);

// Export User model
export default User;