import { useState } from "react";

import type { Post } from "../types/post";

import { useAppDispatch } from "../app/hooks";

import { deletePost, updatePost } from "../features/posts/postsSlice";

interface PostCardProps {
  post: Post;
}

function PostCard({ post }: PostCardProps) {
  const dispatch = useAppDispatch();

  const [isEditing, setIsEditing] = useState(false);

  const [title, setTitle] = useState(post.title);
  const [body, setBody] = useState(post.body);

  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleUpdate = async () => {
    try {
      setIsSaving(true);

      await dispatch(updatePost({ ...post, title, body })).unwrap();

      setIsEditing(false);
    } catch (error) {
      console.error("Update failed:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    try {
      setIsDeleting(true);

      await dispatch(deletePost(post.id)).unwrap();
    } catch (error) {
      console.error("Delete failed:", error);

      setIsDeleting(false);
    }
  };

  if (isEditing) {
    return (
      <article>
        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />

        <textarea
          value={body}
          onChange={(event) => setBody(event.target.value)}
        />

        <button onClick={handleUpdate} disabled={isSaving}>
          {isSaving ? "Saving..." : "Save"}
        </button>

        <button onClick={() => setIsEditing(false)}>Cancel</button>
      </article>
    );
  }

  return (
    <article>
      <h3>{post.title}</h3>

      <p>{post.body}</p>

      <button onClick={() => setIsEditing(true)}>Edit</button>

      <button onClick={handleDelete} disabled={isDeleting}>
        {isDeleting ? "Deleting..." : "Delete"}
      </button>
    </article>
  );
}

export default PostCard;
