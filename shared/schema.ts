import { z } from "zod";

export const userSchema = z.object({
  uid: z.string(),
  email: z.string().email(),
  displayName: z.string().nullable(),
  photoURL: z.string().nullable()
});

export type User = z.infer<typeof userSchema>;

export const postSchema = z.object({
  id: z.string(),
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  excerpt: z.string(),
  thumbnail: z.string(),
  authorId: z.string(),
  authorName: z.string(),
  createdAt: z.number(),
  updatedAt: z.number()
});

export type Post = z.infer<typeof postSchema>;

export const insertPostSchema = postSchema.omit({ 
  id: true,
  authorId: true,
  authorName: true,
  createdAt: true,
  updatedAt: true 
});

export type InsertPost = z.infer<typeof insertPostSchema>;