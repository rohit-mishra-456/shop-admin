import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
 
export const signin = createAsyncThunk(
    "user/login",
    async (payload: { email: string, password: string }) => {
        const response = await axios.post(`${process.env.VITE_APP_API_URL}login`, {
            email: payload.email, password: payload.password
        });
        return response?.data || {};
    }
);

export interface InitialState {
    token: string | null,
    success: boolean,
    error: boolean,
    loading: boolean,
}
const initialState = {
    token: null,
    success: false,
    error: false,
    loading: false
};
 
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    //sync  
    reducers: {
        reset() {
            localStorage.removeItem("accessToken")
            return { ...initialState }
        },
 
    },
    //async
    extraReducers: (builder) => {
        builder
            .addCase(signin.pending, (state) => {
                state.loading = true;
            })
            .addCase(signin.fulfilled, (state, action) => {
                localStorage.setItem("accessToken", action.payload?.token)
                state.token = action.payload?.token;
                state.success = action.payload?.success;
                state.loading = false;
            })
            .addCase(signin.rejected, (state) => {
                state.error = true;
                state.loading = false;
            });
    },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;import { createApi } from '@reduxjs/toolkit/query/react';
