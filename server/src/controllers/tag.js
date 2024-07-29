import Tag from "../models/Tag.js";

export const getAllTags = async (req, res) => {
  try {
    const tags = await Tag.find();
    res.json({ success: true, result: tags });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getTagById = async (req, res) => {
  try {
    const tag = await Tag.findById(req.params.id);
    if (!tag) {
      return res.status(404).json({ success: false, message: "Tag not found" });
    }
    res.json({ success: true, result: tag });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
