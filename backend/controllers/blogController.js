import Blog from "../models/Blog.js";
import Comment from "../models/Comment.js";
import asyncHandler from "../utils/asyncHandler.js";

const populate = (query) =>
  query.populate("author", "name avatar").populate("likes", "_id");
export const getBlogs = asyncHandler(async (req, res) => {
  const { search = "", category = "" } = req.query;
  const filter = {};
  if (category && category !== "All") filter.category = category;
  if (search.trim())
    filter.$or = ["title", "description", "content", "category"].map((key) => ({
      [key]: { $regex: search.trim(), $options: "i" },
    }));
  const blogs = await populate(
    Blog.find(filter).sort({ createdAt: -1 }),
  ).lean();
  res.json({ blogs });
});
export const getBlog = asyncHandler(async (req, res) => {
  const blog = await populate(Blog.findById(req.params.id));
  if (!blog) {
    res.status(404);
    throw new Error("Blog not found");
  }
  const comments = await Comment.find({ blog: blog._id })
    .populate("author", "name avatar")
    .sort({ createdAt: -1 });
  res.json({ blog, comments });
});
export const createBlog = asyncHandler(async (req, res) => {
  const { title, description, content, imageUrl, category, tags } = req.body;
  if (!title?.trim() || !description?.trim() || !content?.trim()) {
    res.status(400);
    throw new Error("Title, description and content are required");
  }
  const blog = await Blog.create({
    title,
    description,
    content,
    imageUrl,
    category,
    tags: Array.isArray(tags) ? tags : [],
    author: req.user._id,
  });
  res.status(201).json({ blog: await populate(Blog.findById(blog._id)) });
});
export const updateBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) {
    res.status(404);
    throw new Error("Blog not found");
  }
  if (!blog.author.equals(req.user._id)) {
    res.status(403);
    throw new Error("You can only edit your own posts");
  }
  const fields = [
    "title",
    "description",
    "content",
    "imageUrl",
    "category",
    "tags",
  ];
  fields.forEach((field) => {
    if (req.body[field] !== undefined) blog[field] = req.body[field];
  });
  await blog.save();
  res.json({ blog: await populate(Blog.findById(blog._id)) });
});
export const deleteBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) {
    res.status(404);
    throw new Error("Blog not found");
  }
  if (!blog.author.equals(req.user._id)) {
    res.status(403);
    throw new Error("You can only delete your own posts");
  }
  await Comment.deleteMany({ blog: blog._id });
  await blog.deleteOne();
  res.json({ message: "Blog deleted successfully" });
});
export const toggleLike = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) {
    res.status(404);
    throw new Error("Blog not found");
  }
  const index = blog.likes.findIndex((id) => id.equals(req.user._id));
  if (index >= 0) blog.likes.splice(index, 1);
  else blog.likes.push(req.user._id);
  await blog.save();
  res.json({ likes: blog.likes, liked: index < 0 });
});
export const addComment = asyncHandler(async (req, res) => {
  const content = req.body.content?.trim();
  if (!content) {
    res.status(400);
    throw new Error("Comment cannot be empty");
  }
  const blog = await Blog.findById(req.params.id);
  if (!blog) {
    res.status(404);
    throw new Error("Blog not found");
  }
  const comment = await Comment.create({
    blog: blog._id,
    author: req.user._id,
    content,
  });
  await comment.populate("author", "name avatar");
  res.status(201).json({ comment });
});
export const deleteComment = asyncHandler(async (req, res) => {
  const comment = await Comment.findById(req.params.commentId);
  if (!comment) {
    res.status(404);
    throw new Error("Comment not found");
  }
  if (!comment.author.equals(req.user._id)) {
    res.status(403);
    throw new Error("You can only delete your own comments");
  }
  await comment.deleteOne();
  res.json({ message: "Comment deleted" });
});
