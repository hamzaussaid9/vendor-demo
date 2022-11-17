import { configureStore } from '@reduxjs/toolkit';
import authReducer from './components/slices/auth.slice';
import resetReducer from './components/slices/reset.slice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        reset: resetReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch