import mongoose from "mongoose";
const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 140 },
    description: { type: String, required: true, trim: true, maxlength: 300 },
    content: { type: String, required: true },
    imageUrl: { type: String, default: "" },
    category: { type: String, default: "General", trim: true },
    tags: [{ type: String, trim: true }],
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true },
);
blogSchema.index({
  title: "text",
  description: "text",
  content: "text",
  category: "text",
});
export default mongoose.model("Blog", blogSchema);
