import { createSlice } from '@reduxjs/toolkit'

export const tasksSlice = createSlice(
    {
        name: "tasks",
        initialState: {
            tasks: [],
            pending: false,
            error: false,
            errorText: null
        },
        reducers: {
            getTasksStart: (state) => {
                state.pending = true;
            },
            getTasksSuccess: (state, action) => {
                state.pending = false;
                state.tasks = action.payload;
            },
            getTasksError: (state, action) => {
                state.errorText = action.payload.error;
                state.pending = false;
                state.error = true;
            },
            setTasks: (state, action) => {
            
                state.tasks = action.payload.tasks;
            },
            swapTasks: (stage, action) => {
                stage.tasks[action.payload.sourceColIndex].tasks = action.payload.sourceTasks;
                stage.tasks[action.payload.destinationColIndex].tasks = action.payload.destinationTasks;
            }
        }
    }
)

export const { getTasksStart, getTasksSuccess, getTasksError, setTasks, swapTasks } = tasksSlice.actions;
export default tasksSlice.reducer;