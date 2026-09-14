import { useState } from "react";

import { useAppDispatch } from "../app/hooks";
import { addPost } from "../features/posts/postsSlice";

function PostForm() {
  const dispatch = useAppDispatch();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title.trim() || !body.trim()) {
      return;
    }

    try {
      setIsSubmitting(true);

      await dispatch(addPost({ userId: 1, title, body })).unwrap();

      setTitle("");
      setBody("");
    } catch (error) {
      console.error("Could not create post:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Post</h2>

      <div>
        <label>Title</label>

        <input
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </div>

      <div>
        <label>Body</label>

        <textarea
          value={body}
          onChange={(event) => setBody(event.target.value)}
        />
      </div>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Creating..." : "Create Post"}
      </button>
    </form>
  );
}

export default PostForm;
