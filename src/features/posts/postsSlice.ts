import { createAsyncThunk, createSlice,} from "@reduxjs/toolkit";

import type { Post, NewPost } from "../../types/post";

import { getPosts, createPost, editPost, removePost, } from "../../services/postsApi";

// Create our Redux state
interface PostsState {
    items: Post[];
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
}

const initialState: PostsState = {
    items: [],
    status: "idle",
    error: null,
};

// createAsyncThunk
export const fetchPosts = createAsyncThunk<Post[]>(
    "posts/fetchPosts",
    async () => {
        return await getPosts();
    }
);

// Create thunk
export const addPost = createAsyncThunk<Post,NewPost>(
    "posts/addPost",
    async (newPost) => {
        return await createPost(newPost);
    }
);

// Update thunk
export const updatePost = createAsyncThunk<Post,Post>(
    "posts/updatePost",
    async (post) => {
        return await editPost(post);
    }
);

// Delete thunk
export const deletePost = createAsyncThunk<number,number>(
    "posts/deletePost",
    async (id) => {
        return await removePost(id);
    }
);

// Create the actual slice
const postsSlice = createSlice({
    name: "posts",

    initialState,

    reducers: {},

    extraReducers: (builder) => {
        builder

            // READ POSTS
            .addCase(fetchPosts.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })

            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.items = action.payload;
            })

            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message ?? "Something went wrong";
            })

            // CREATE POST
            .addCase(addPost.fulfilled, (state, action) => {
                state.items.unshift(action.payload);
            })

            .addCase(addPost.rejected, (state, action) => {
                state.error = action.error.message ?? "Could not create post";
            })

            // UPDATE POST
            .addCase(updatePost.fulfilled, (state, action) => {
                const index = state.items.findIndex(
                    (post) => post.id === action.payload.id
                );

                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            })

            .addCase(updatePost.rejected, (state, action) => {
                state.error =
                    action.error.message ?? "Could not update post";
            })

            // DELETE POST
            .addCase(deletePost.fulfilled, (state, action) => {
                state.items = state.items.filter(
                    (post) => post.id !== action.payload
                );
            })

            .addCase(deletePost.rejected, (state, action) => {
                state.error =
                    action.error.message ?? "Could not delete post";
            });
    },
});

export default postsSlice.reducer;