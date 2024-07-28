import express from "express";
import { getAllTags } from "../controllers/tag.js";

const tagRouter = express.Router();

tagRouter.get("/", getAllTags);

export default tagRouter;
