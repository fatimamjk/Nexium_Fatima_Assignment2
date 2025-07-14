import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI!;

export async function connectDB() {
  if (mongoose.connections[0].readyState) return;
  await mongoose.connect(MONGODB_URI);
}

const blogSchema = new mongoose.Schema({
  url: String,
  fullText: String,
  summary: String,
  urduSummary: String
});

export const Blog = mongoose.models.Blog || mongoose.model('Blog', blogSchema);
