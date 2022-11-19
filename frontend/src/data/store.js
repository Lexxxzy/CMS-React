import { configureStore } from '@reduxjs/toolkit';
import tasksSlice from './tasksSlice';
import userReducer from './userSlice';

export default configureStore(
    {
        reducer: {
            user: userReducer,
            tasks: tasksSlice
        },
    }
)