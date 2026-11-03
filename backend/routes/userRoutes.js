import { Router } from "express";
import {
  getUser,
  updateProfile,
  myBlogs,
} from "../controllers/userController.js";
import protect from "../middleware/authMiddleware.js";
const router = Router();
router.get("/me/blogs", protect, myBlogs);
router.put("/me", protect, updateProfile);
router.get("/:id", getUser);
export default router;
