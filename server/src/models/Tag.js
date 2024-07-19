const mongoose = import("mongoose");

const tagSchema = new mongoose.Schema({
  name: String,
});

const Tag = mongoose.model("tags", tagSchema);

export default Tag;
