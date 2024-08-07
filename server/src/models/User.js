import mongoose from "mongoose";
import Book from "./Book.js"; // Ensure Book model is imported

import validateAllowedFields from "../util/validateAllowedFields.js";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, "Please use a valid email address."],
  }, // Added validation for 'email' format.
  password: { type: String, required: true }, // We can add validation for 'password' (eg., minimum length).
  profileImage: String,
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: Book }],
  weeklyEmail: { type: Boolean, default: true },
});

const User = mongoose.model("users", userSchema);

export const validateUser = (userObject) => {
  const errorList = [];
  const allowedKeys = ["name", "email", "password"];

  const validatedKeysMessage = validateAllowedFields(userObject, allowedKeys);

  if (validatedKeysMessage.length > 0) {
    errorList.push(...validatedKeysMessage); // Used the spread operator to flatten the validatedKeysMessage array into errorList rather than having them as nested array.
  }
  // Changed (userObject.PROPERTY == null) to (!userObject.PROPERTY) to catch any falsy value (including null, undefined, empty string, 0, false, NaN)
  if (!userObject.name) {
    errorList.push("name is a required field");
  }

  if (!userObject.email) {
    errorList.push("email is a required field");
  }

  if (!userObject.password) {
    errorList.push("password is a required field");
  }

  return errorList;
};

export default User;
