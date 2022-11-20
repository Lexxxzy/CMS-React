import { createSlice } from '@reduxjs/toolkit'

export const representativesReducer = createSlice(
    {
        name: "representatives",
        initialState: {
            representatives: [],
            pending: false,
            error: false,
            errorText: null
        },
        reducers: {
            getRepresentativesStart: (state) => {
                state.pending = true;
            },
            getRepresentativesSuccess: (state, action) => {
                state.pending = false;
                state.representatives = action.payload;
            },
            getRepresentativesError: (state, action) => {
                state.errorText = action.payload.error;
                state.pending = false;
                state.error = true;
            },
        }
    }
)

export const { getRepresentativesStart, getRepresentativesSuccess, getRepresentativesError } = representativesReducer.actions;
export default representativesReducer.reducer;