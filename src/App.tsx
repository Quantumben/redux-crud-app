import { useEffect } from "react";

import PostForm from "./components/PostForm";
import PostList from "./components/PostList";

import { useAppDispatch, useAppSelector } from "./app/hooks";

import { fetchPosts } from "./features/posts/postsSlice";

function App() {
  const dispatch = useAppDispatch();

  const status = useAppSelector((state) => state.posts.status);

  const error = useAppSelector((state) => state.posts.error);

  const totalPosts = useAppSelector((state) => state.posts.items.length);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPosts());
    }
  }, [dispatch, status]);

  return (
    <main>
      <h1>Redux Toolkit CRUD</h1>

      <p>Total Posts: {totalPosts}</p>

      <PostForm />

      {status === "loading" && <p>Loading posts...</p>}

      {status === "failed" && <p>{error}</p>}

      {status === "succeeded" && <PostList />}
    </main>
  );
}

export default App;
