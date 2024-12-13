import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slices/counterSlice";
import snackBarReducer from "./slices/snackBarSlice";
import createPuzzleReducer from "./slices/puzzles/createPuzzles";
import topBarReducer from "./slices/topBarSlice";
import { affiliateSlice } from "./slices/affiliate";
// ...

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    snackBar: snackBarReducer,
    createPuzzle: createPuzzleReducer,
    topBar: topBarReducer,
    affiliate: affiliateSlice.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
