import PostCard from "./PostCard";

import { useAppSelector } from "../app/hooks";

function PostList() {
  const posts = useAppSelector((state) => state.posts.items);

  if (posts.length === 0) {
    return <p>No posts available.</p>;
  }

  return (
    <section>
      <h2>Posts</h2>

      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </section>
  );
}

export default PostList;
