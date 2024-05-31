import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { stat } from "fs";
import { adminprofile, rowData } from "../utils/commonInterfaces";

 export const fetchAdmins = createAsyncThunk('fetchAdmins', async () => {
const response = await fetch('http://localhost:3000/admins')
return response.json()
})

const authSlice = createSlice({
    name: "authData",
    initialState: {
        adminData:{
             id: '',
    img: '',
    emailId: '',
    password: '',
    allFields:<any>[]
        },
        allAdmins:[],
        dashboardType:'User'
    },
    reducers:{
        addAdmin:(state, action) => {
            state.adminData = action.payload         
        },
        updateAdminFields:(state, action) => {
            state.adminData.allFields = action.payload
        },
        clearAuth:(state) => {
            state.adminData = {
             id: '',
    img: '',
    emailId: '',
    password: '',
    allFields:<any>[]
        }
        },
        handleDashboard:(state, action) => {
            state.dashboardType = action.payload
        }
    },
    extraReducers:(builder) => {
        builder.addCase(fetchAdmins.fulfilled, (state, action) => {
            state.allAdmins = action.payload
        });
        builder.addCase(fetchAdmins.rejected, (state, action) => {
        })
    }
})

export default authSlice.reducer

export const { addAdmin, updateAdminFields, clearAuth, handleDashboard} = authSlice.actions
