import Tag from "../models/Tag.js";

export const getAllTags = async (req, res) => {
  try {
    const tags = await Tag.find();
    res.status(200).json(tags);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching tags", error: error.message });
  }
};
