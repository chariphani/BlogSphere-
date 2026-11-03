import User from "../models/User.js";
import Blog from "../models/Blog.js";
import asyncHandler from "../utils/asyncHandler.js";
export const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select(
    "name avatar bio createdAt",
  );
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  const blogs = await Blog.find({ author: user._id })
    .sort({ createdAt: -1 })
    .populate("author", "name avatar");
  res.json({ user, blogs });
});
export const updateProfile = asyncHandler(async (req, res) => {
  const { name, bio, avatar } = req.body;
  if (name !== undefined) req.user.name = name.trim();
  if (bio !== undefined) req.user.bio = bio.trim();
  if (avatar !== undefined) req.user.avatar = avatar.trim();
  await req.user.save();
  res.json({
    user: {
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      bio: req.user.bio,
      avatar: req.user.avatar,
    },
  });
});
export const myBlogs = asyncHandler(async (req, res) => {
  const blogs = await Blog.find({ author: req.user._id })
    .sort({ createdAt: -1 })
    .populate("author", "name avatar");
  res.json({ blogs });
});
