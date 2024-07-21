import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../util/cloudinaryConfig.js";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "uploads",
    format: async () => "png",
    public_id: (file) => `${file.fieldname}-${Date.now()}`,
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10000000 },
}).single("image");

export default upload;
