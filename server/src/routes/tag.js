import express from "express";
import { getAllTags, getTagById } from "../controllers/tag.js";

const tagRouter = express.Router();

tagRouter.get("/", getAllTags);
tagRouter.get("/:id", getTagById);

export default tagRouter;
