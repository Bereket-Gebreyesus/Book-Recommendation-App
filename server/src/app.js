import express from "express";
import cors from "cors";

import userRouter from "./routes/user.js";
import bookRouter from "./routes/book.js";
import tagRouter from "./routes/tag.js";
import admin from "./util/firebaseAdmin.js";

// Create an express server
const app = express();
// Tell express to use the json middleware
app.use(express.json());
// Allow everyone to access our API. In a real application, we would need to restrict this!
app.use(cors());

/****** Attach routes ******/
/**
 * We use /api/ at the start of every route!
 * As we also host our client code on heroku we want to separate the API endpoints.
 */

// This route is used to prevent the  ESLint rule error.There is no need to implement this route.
app.get("/admin/users", async (req, res) => {
  try {
    const listUsersResult = await admin.auth().listUsers();
    res.json(listUsersResult.users);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.use("/api/user", userRouter);
app.use("/api/books", bookRouter);
app.use("/api/tags", tagRouter);
export default app;
