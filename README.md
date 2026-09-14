# Redux CRUD App Reference

This README explains the core Redux ideas used in this project. It is written as a beginner-friendly reference, so you can come back to it whenever Redux concepts start to feel confusing.

The goal is simple:

- Understand why Redux exists.
- Learn the main Redux words.
- See how data moves through a Redux application.
- Understand how API requests fit into Redux with `createAsyncThunk`.

## Table of Contents

1. [Why Redux Exists](#why-redux-exists)
2. [Redux as a Warehouse](#redux-as-a-warehouse)
3. [The 7 Redux Words You Must Understand](#the-7-redux-words-you-must-understand)
4. [The Basic Redux Cycle](#the-basic-redux-cycle)
5. [Redux and API Calls](#redux-and-api-calls)
6. [Quick Mental Model](#quick-mental-model)

## Why Redux Exists

Imagine your React application looks like this:

```text
App
├── Header
├── PostForm
├── PostList
│   ├── Post
│   ├── Post
│   └── Post
└── Sidebar
```

Suppose `PostForm` creates a new post.

After that happens, other parts of the app may need to know about the new post:

- `PostList` needs to show the new post.
- `Header` may need to display the total number of posts.
- `Sidebar` may need to show recent activity.

Without Redux, you might store the posts in `App.tsx`:

```tsx
const [posts, setPosts] = useState([])
```

Then you would pass `posts` and `setPosts` down to child components:

```text
App
 │
 ├── posts    → Header
 ├── setPosts → PostForm
 └── posts    → PostList
```

This can work in small applications. But as the app grows, the component tree can become deeper:

```text
App
 ↓
Dashboard
 ↓
Content
 ↓
PostPage
 ↓
PostList
 ↓
PostItem
```

Now you may need to pass data through components that do not actually use that data. They only receive it so they can pass it further down.

That problem is commonly called **prop drilling**.

Redux helps solve this by giving your app a central place for shared state. Components can read from that central place and send updates to it without manually passing state through every level of the component tree.

## Redux as a Warehouse

Think of Redux like a warehouse for application data.

```text
                 REDUX STORE
        ┌────────────────────────┐
        │ posts                  │
        │ users                  │
        │ authentication         │
        │ cart                   │
        │ notifications          │
        └────────────────────────┘
```

Your components can retrieve information from that warehouse whenever they need it.

Instead of passing data down like this:

```text
App
 ↓
Component A
 ↓
Component B
 ↓
Component C
```

Redux allows components to connect directly to the shared store:

```text
                 REDUX STORE
                 /         \
                /           \
               ▼             ▼
          Component A   Component C
```

This does not mean every piece of state should go into Redux. Local state still belongs inside components when only one component needs it.

Use Redux when state is shared across multiple parts of the application or when the state logic becomes easier to manage in one central place.

## The 7 Redux Words You Must Understand

Before touching Redux code, these are the most important terms to understand.

### 1. State

State simply means **data**.

Example:

```ts
const posts = [
  {
    id: 1,
    title: "Learning Redux",
    body: "Redux is becoming clearer",
  },
]
```

That array is state because it represents data the application cares about.

In a CRUD app, state may include:

- A list of posts.
- The currently selected post.
- Whether data is loading.
- An error message from a failed request.

### 2. Store

The store is the big container that holds Redux state.

You can imagine the store like this:

```ts
const store = {
  posts: [],
  users: [],
  cart: [],
}
```

There should normally be **one Redux store** for the whole application.

The store is where Redux keeps the current version of your application state.

### 3. Slice

A slice represents one section of the Redux store.

For example:

```text
Redux Store
│
├── posts
├── users
├── cart
└── authentication
```

Each section can have its own slice:

```text
postsSlice
usersSlice
cartSlice
authSlice
```

A slice manages one area of your Redux state.

For example, `postsSlice` may manage:

- The list of posts.
- The loading state for posts.
- Errors related to posts.
- Reducers for creating, updating, and deleting posts.

### 4. Reducer

A reducer describes how the state should change.

For a posts feature, reducers may describe actions like:

```text
addPost()
deletePost()
updatePost()
```

If Redux receives a `deletePost` action, the reducer decides what the posts state should look like after that post is removed.

In plain English, a reducer answers this question:

> An action happened. What should the new state be?

### 5. Action

An action describes something that happened in the application.

Example:

```ts
{
  type: "posts/deletePost",
  payload: 5
}
```

This means:

```text
Delete the post with the id of 5.
```

The `type` tells Redux what happened.

The `payload` carries the extra data needed to complete the action.

### 6. Dispatch

Dispatch means sending an action to Redux.

Example:

```ts
dispatch(deletePost(5))
```

You are telling Redux:

```text
Please run the deletePost action for post 5.
```

Dispatch is how components request a state change.

Components do not directly change Redux state. They dispatch actions, and reducers handle the state update.

### 7. Selector

A selector gets data from Redux.

Example:

```ts
const posts = useAppSelector((state) => state.posts.items)
```

This means:

```text
Go inside Redux state.
Find the posts slice.
Give me the items.
```

Selectors are used when a component needs to read Redux state.

## The Basic Redux Cycle

For normal user actions, the Redux flow looks like this:

```text
USER CLICKS BUTTON
        ↓
dispatch(action)
        ↓
REDUX STORE
        ↓
REDUCER
        ↓
STATE CHANGES
        ↓
useSelector sees the change
        ↓
COMPONENT RE-RENDERS
```

Example:

1. The user clicks a delete button.
2. The component dispatches `deletePost(5)`.
3. Redux sends that action to the reducer.
4. The reducer removes the post from state.
5. Components using that state re-render with the updated data.

## Redux and API Calls

Redux can also handle asynchronous work such as API requests.

For API calls, the flow looks like this:

```text
Component
    ↓
dispatch(thunk)
    ↓
API REQUEST
    ↓
pending
    ↓
fulfilled OR rejected
    ↓
Reducer updates Redux state
    ↓
Component re-renders
```

Redux Toolkit provides `createAsyncThunk` to help manage this pattern.

`createAsyncThunk` automatically creates three action states for asynchronous work:

- `pending`: the request has started.
- `fulfilled`: the request completed successfully.
- `rejected`: the request failed.

For example, when fetching posts:

```text
fetchPosts.pending
fetchPosts.fulfilled
fetchPosts.rejected
```

Your slice can respond to each state:

- When pending, set `loading` to `true`.
- When fulfilled, save the returned posts into Redux state.
- When rejected, save the error message.
- When the request finishes, set `loading` back to `false`.

## Quick Mental Model

Use this summary when you need to remember how everything fits together:

```text
State    = the data
Store    = the central container for the data
Slice    = one section of the store
Reducer  = logic that changes state
Action   = description of what happened
Dispatch = sending an action to Redux
Selector = reading data from Redux
Thunk    = async logic, usually for API calls
```

The shortest version:

```text
Component dispatches an action.
Reducer updates the store.
Selector reads the new state.
Component re-renders.
```

That is the heart of Redux.
