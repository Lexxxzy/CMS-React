import { createSlice } from '@reduxjs/toolkit'

const userInitial = {
    isLogedIn: false,
    login: null,
    "age": null,
    "email": null,
    "full_name": null,
    "passport": null,
    "position": null,
    "salary": null,
    "tin": null
}

export const userSlice = createSlice(
    {
        name: "user",
        initialState: {
            userInfo: {
                isLogedIn: false,
                login: null,
                "age": null,
                "email": null,
                "full_name": null,
                "passport": null,
                "position": null,
                "salary": null,
                "tin": null
            },
            availibleTables: [],
            pending: false,
            error: false,
            errorText: null,
        },
        reducers: {
            logInStart: (state) => {
                state.pending = true;
            },
            logInNext: (state) => {
                state.error = false;
                state.pending = false;
            },
            logInSuccess: (state, action) => {
                state.pending = false;
                state.userInfo.isLogedIn = true;
                state.userInfo.email = action.payload.email;
            },
            logInError: (state, action) => {
                state.errorText = action.payload.error;
                state.pending = false;
                state.error = true;
            },
            logInCancelled: (state) => {
                state.errorText = null;
                state.pending = null;
                state.error = null;
                state.email = null;
            },

            logOut: (state) => {
                state.userInfo = userInitial;
            },

            setLogedInStatus: (state, action) => {
                state.userInfo.isLogedIn = action.payload;
            },

            setUserInfo: (state, action) => {
                state.userInfo.email = action.payload.email;
                state.userInfo.phoneNumber = action.payload.phone;
                state.userInfo.login = action.payload.login;
            },

            getTablesStart: (state) => {
                state.pending = true;
            },
            getTablesSuccess: (state,action) => {
                state.pending = false;
                state.availibleTables = action.payload;
            },
            getTablesError: (state) => {
                state.pending = false;
                state.error = true;
            }
        }
    }
)

export const { logInStart, logInSuccess, logInError, logInCancelled, 
    logOut, setLogedInStatus, setUserInfo, getTablesStart, getTablesSuccess, getTablesError } = userSlice.actions;
export default userSlice.reducer;