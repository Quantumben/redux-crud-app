import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "../features/posts/postsSlice";

export const store = configureStore({
    reducer: {
        posts: postsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>; //TypeScript, look at my store and automatically figure out what my entire Redux state looks like.

export type AppDispatch = typeof store.dispatch; //TypeScript, determine what type my Redux dispatch function should have.

// configureStore handles combining slice reducers
// and configures thunk middleware and Redux DevTools support automatically.