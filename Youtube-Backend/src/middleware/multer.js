import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    switch (file.fieldname) {
      case "thumbnail":
        return {
          folder: "youtube/thumbnails",
          resource_type: "image",
        };

      case "video":
        return {
          folder: "youtube/videos",
          resource_type: "video",
        };

      case "avatar":
        return {
          folder: "youtube/avatars",
          resource_type: "image",
        };

      case "channelbanner":
        return {
          folder: "youtube/channel-banners",
          resource_type: "image",
        };

      default:
        throw new Error(`Unsupported field: ${file.fieldname}`);
    }
  },
});

export default multer({ storage });