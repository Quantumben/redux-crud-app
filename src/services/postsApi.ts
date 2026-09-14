import type { NewPost, Post } from "../types/post";

const API_URL = "https://jsonplaceholder.typicode.com/posts";

export async function getPosts(): Promise<Post[]> {
    const response = await fetch(`${API_URL}?userId=1`);

    if (!response.ok) {
        throw new Error("Failed to fetch posts");
    }

    return response.json();
}

export async function createPost(
    post: NewPost
): Promise<Post> {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
    });

    if (!response.ok) {
        throw new Error("Failed to create post");
    }

    return response.json();
}

export async function editPost(
    post: Post
): Promise<Post> {
    const response = await fetch(`${API_URL}/${post.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title: post.title,
            body: post.body,
        }),
    });

    if (!response.ok) {
        throw new Error("Failed to update post");
    }

    const returnedPost = await response.json();

    return {
        ...post,
        ...returnedPost,
    };
}

export async function removePost(
    id: number
): Promise<number> {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        throw new Error("Failed to delete post");
    }

    return id;
}