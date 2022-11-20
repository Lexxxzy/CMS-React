import { configureStore } from '@reduxjs/toolkit';
import employeesReducer from './employeesSlice';
import representativesReducer from './representativesSlice';
import tasksSlice from './tasksSlice';
import userReducer from './userSlice';

export default configureStore(
    {
        reducer: {
            user: userReducer,
            tasks: tasksSlice,
            employees: employeesReducer,
            representatives: representativesReducer
        },
    }
)