import mongoose from "mongoose";

const tagSchema = new mongoose.Schema(
  {
    tagId: { type: String, required: true, unique: true },
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true, // Remove extra spaces around the tag name
    },
  },
  { timestamps: true },
); // Mongoose will automatically manage `createdAt` and `updatedAt`

const Tag = mongoose.model("Tag", tagSchema);

export default Tag;
