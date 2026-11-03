import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
import asyncHandler from "../utils/asyncHandler.js";

const publicUser = (user) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  avatar: user.avatar,
  bio: user.bio,
  createdAt: user.createdAt,
});
export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name?.trim() || !email?.trim() || !password) {
    res.status(400);
    throw new Error("Name, email and password are required");
  }
  if (password.length < 6) {
    res.status(400);
    throw new Error("Password must be at least 6 characters");
  }
  const exists = await User.findOne({ email: email.toLowerCase() });
  if (exists) {
    res.status(409);
    throw new Error("An account with this email already exists");
  }
  const user = await User.create({ name, email, password });
  res
    .status(201)
    .json({ token: generateToken(user._id), user: publicUser(user) });
});
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email?.toLowerCase() }).select(
    "+password",
  );
  if (!user || !(await user.comparePassword(password || ""))) {
    res.status(401);
    throw new Error("Invalid email or password");
  }
  res.json({ token: generateToken(user._id), user: publicUser(user) });
});
export const me = asyncHandler(async (req, res) =>
  res.json({ user: publicUser(req.user) }),
);
