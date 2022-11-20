import { createSlice } from '@reduxjs/toolkit'

export const employeesReducer = createSlice(
    {
        name: "employees",
        initialState: {
            employees: [],
            pending: false,
            error: false,
            errorText: null
        },
        reducers: {
            getEmployeesStart: (state) => {
                state.pending = true;
            },
            getEmployeesSuccess: (state, action) => {
                state.pending = false;
                state.employees = action.payload;
            },
            getEmployeesError: (state, action) => {
                state.errorText = action.payload.error;
                state.pending = false;
                state.error = true;
            },
        }
    }
)

export const { getEmployeesStart, getEmployeesSuccess, getEmployeesError } = employeesReducer.actions;
export default employeesReducer.reducer;