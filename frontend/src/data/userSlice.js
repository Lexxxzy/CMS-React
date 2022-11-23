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
            pending: null,
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

            regiterStart: (state) => {
                state.pending = true;
            },
            regiterNext: (state) => {
                state.error = false;
                state.pending = false;
            },
            regiterSuccess: (state, action) => {
                state.pending = false;
                state.error = false;
                state.userInfo.isLogedIn = true;
            },
            regiterError: (state, action) => {
                state.errorText = action.payload.error;
                state.pending = false;
                state.error = true;
            },


            logOut: (state) => {
                state.userInfo = userInitial;
            },

            setLogedInStatusStart: (state) => {
                state.pending = true;
            },

            setLogedInStatus: (state, action) => {
                console.log("from slice: ", action.payload)
                state.userInfo.isLogedIn = action.payload;
                state.pending = false;
            },

            setUserInfoStart: (state) => {
                state.pending = true;
            },
            setUserInfoSuccess: (state, action) => {
                state.userInfo.login = action.payload.login;
                state.userInfo.email = action.payload.email;
                state.userInfo.full_name = action.payload.full_name;
                state.userInfo.passport = action.payload.passport;
                state.userInfo.position = action.payload.position;
                state.userInfo.tin = action.payload.tin;
                state.userInfo.salary = action.payload.salary==="₽" ? "Not specified" : action.payload.salary;
                state.userInfo.age = action.payload.age===null ? "Not specified" : action.payload.age;
                state.pending = false;
            },
            setUserInfoError: (state,action) => {
                state.errorText = action.payload.error;
                state.pending = false;
                state.error = true;
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

export const { logInStart, logInSuccess, logInError, logInCancelled, setLogedInStatusStart,
    logOut, setLogedInStatus, setUserInfoStart, setUserInfoSuccess, setUserInfoError, getTablesStart, 
    getTablesSuccess, getTablesError, regiterStart, regiterNext, regiterSuccess, regiterError } = userSlice.actions;
export default userSlice.reducer;