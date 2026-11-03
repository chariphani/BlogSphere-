import { Router } from "express";
import { register, login, me } from "../controllers/authController.js";
import protect from "../middleware/authMiddleware.js";
const router = Router();
router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, me);
router.post("/logout", (_req, res) =>
  res.json({ message: "Logged out. Remove the token on the client." }),
);
export default router;
