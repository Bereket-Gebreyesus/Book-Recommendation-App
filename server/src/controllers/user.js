import User, { validateUser } from "../models/User.js";
import { logError } from "../util/logging.js";
import validationErrorMessage from "../util/validationErrorMessage.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import admin from "firebase-admin";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json({ success: true, result: users });
  } catch (error) {
    logError(error);
    res
      .status(500)
      .json({ success: false, msg: "Unable to get users, try again later" });
  }
};
export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (typeof email !== "string" || typeof password !== "string") {
      res.status(400).json({
        success: false,
        msg: `You need to provide 'email' and 'password' as strings. Received: ${JSON.stringify(req.body)}`,
      });
      return;
    }

    const user = { name, email, password };

    const errorList = validateUser(user);

    if (errorList.length > 0) {
      res
        .status(400)
        .json({ success: false, msg: validationErrorMessage(errorList) });
      return;
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ success: false, msg: "Email already in use" });
      return;
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;

    // Create the user
    const newUser = await User.create(user);

    res.status(201).json({ success: true, user: newUser });
  } catch (error) {
    logError(error);
    res
      .status(500)
      .json({ success: false, msg: "Unable to create user, try again later" });
  }
};

export const getUser = async (req, res) => {
  const email = req.query.email;
  try {
    const user = await User.findOne({ email: email });
    if (user) {
      res.status(200).json({ userId: user._id });
    } else {
      res.status(200).json({ message: "User not found", user: null });
    }
  } catch (error) {
    res.status(500).send("Server error");
  }
};
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (typeof email !== "string" || typeof password !== "string") {
      res.status(400).json({
        success: false,
        msg: `You need to provide 'email' and 'password' as strings. Received: ${JSON.stringify(req.body)}`,
      });
      return;
    }

    const user = await User.findOne({ email: email });
    if (!user) {
      res.status(404).json({ success: false, msg: "User not found" });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ success: false, msg: "Invalid password" });
      return;
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ success: true, token: token });
  } catch (error) {
    logError(error);
    res
      .status(500)
      .json({ success: false, msg: "Unable to login, try again later" });
  }
};

export const googleSignIn = async (req, res) => {
  const { token } = req.body;

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    const { email, name, picture } = decodedToken;

    let user = await User.findOne({ email: email });

    if (!user) {
      user = new User({
        name,
        email,
        profileImage: picture,
        password: "defaultPassword", // Set a default password
      });
      await user.save();
    }

    const jwtToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ success: true, token: jwtToken });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Google sign-in failed",
      error: error.message,
    });
  }
};
export const githubSignIn = async (req, res) => {
  const { token } = req.body;

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    const { email, name, picture } = decodedToken;

    let user = await User.findOne({ email: email });

    if (!user) {
      user = new User({
        name,
        email,
        profileImage: picture,
        password: "defaultPassword", // Set a default password
      });
      await user.save();
    }

    const jwtToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ success: true, token: jwtToken });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "GitHub sign-in failed",
      error: error.message,
    });
  }
};

// GET user by id, return user object without password
export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id).select("-password");
    if (!user) {
      return res.status(404).json({ success: false, msg: "User not found" });
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, msg: "Server error" });
  }
};

// Add a book to user's favorites array
export const addFavorite = async (req, res) => {
  const { userId, bookId } = req.body;
  if (!userId || !bookId) {
    return res
      .status(400)
      .json({ success: false, msg: "User ID and Book ID are required" });
  }
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, msg: "User not found" });
    }
    if (user.favorites.includes(bookId)) {
      return res
        .status(400)
        .json({ success: false, msg: "Book already in favorites" });
    }
    user.favorites.push(bookId);
    await user.save();
    res.status(200).json({ success: true, msg: "Book added to favorites" });
  } catch (error) {
    res.status(500).json({ success: false, msg: "Server error" });
  }
};

// Remove a book from user's favorites array
export const removeFavorite = async (req, res) => {
  const { userId, bookId } = req.body;
  if (!userId || !bookId) {
    return res
      .status(400)
      .json({ success: false, msg: "User ID and Book ID are required" });
  }
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, msg: "User not found" });
    }
    user.favorites = user.favorites.filter((fav) => fav.toString() !== bookId);

    await user.save();

    res.status(200).json({ success: true, msg: "Book removed from favorites" });
  } catch (error) {
    res.status(500).json({ success: false, msg: "Server error" });
  }
};

// Send userID and boolean to set weeklyEmail status
export const setWeeklyEmail = async (req, res) => {
  const { userId, weeklyEmail } = req.body;
  if (!userId || weeklyEmail === undefined) {
    return res
      .status(400)
      .json({ success: false, msg: "User ID and weeklyEmail are required" });
  }
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, msg: "User not found" });
    }
    user.weeklyEmail = weeklyEmail;
    await user.save();
    res.status(200).json({ success: true, msg: "Weekly email status updated" });
  } catch (error) {
    res.status(500).json({ success: false, msg: "Server error" });
  }
};
