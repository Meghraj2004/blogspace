import { collection, addDoc, getDocs, getDoc, doc, updateDoc, deleteDoc, query, orderBy, where } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "./firebase";
import { Post, InsertPost } from "@shared/schema";

const COLLECTION_NAME = "posts";
const postsCollection = collection(db, COLLECTION_NAME);

export async function getPosts(): Promise<Post[]> {
  const q = query(postsCollection, orderBy("createdAt", "desc"));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as Post[];
}

export async function getUserPosts(userId: string): Promise<Post[]> {
  const q = query(
    postsCollection,
    where("authorId", "==", userId),
    orderBy("createdAt", "desc")
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as Post[];
}

export async function getPost(id: string): Promise<Post | undefined> {
  const docRef = doc(db, COLLECTION_NAME, id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    return undefined;
  }

  return {
    id: docSnap.id,
    ...docSnap.data()
  } as Post;
}

export async function createPost(data: InsertPost): Promise<Post> {
  const auth = getAuth();
  if (!auth.currentUser) {
    throw new Error("Must be logged in to create a post");
  }

  const now = Date.now();
  const newPost = {
    ...data,
    authorId: auth.currentUser.uid,
    authorName: auth.currentUser.displayName || "Anonymous",
    createdAt: now,
    updatedAt: now
  };

  const docRef = await addDoc(postsCollection, newPost);
  return {
    id: docRef.id,
    ...newPost
  };
}

export async function updatePost(id: string, data: InsertPost): Promise<Post> {
  const auth = getAuth();
  const post = await getPost(id);

  if (!auth.currentUser) {
    throw new Error("Must be logged in to update a post");
  }

  if (post?.authorId !== auth.currentUser.uid) {
    throw new Error("Can only edit your own posts");
  }

  const docRef = doc(db, COLLECTION_NAME, id);
  const updatedData = {
    ...data,
    updatedAt: Date.now()
  };

  await updateDoc(docRef, updatedData);

  return {
    id,
    ...post,
    ...updatedData
  };
}

export async function deletePost(id: string): Promise<void> {
  const auth = getAuth();
  const post = await getPost(id);

  if (!auth.currentUser) {
    throw new Error("Must be logged in to delete a post");
  }

  if (post?.authorId !== auth.currentUser.uid) {
    throw new Error("Can only delete your own posts");
  }

  const docRef = doc(db, COLLECTION_NAME, id);
  await deleteDoc(docRef);
}