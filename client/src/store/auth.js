import { createSlice } from "@reduxjs/toolkit";
//import { login } from "../../../backend/controllers/userController";

const authSlice =createSlice({
    name: "auth",
    initialState: {isLoggedIn: false},
    reducers: {
        login(state){
            state.isLoggedIn =true;
        },
        logout(state){
            state.isLoggedIn = false;
        },
    },
});

export const authActions =authSlice.actions;
export default authSlice.reducer