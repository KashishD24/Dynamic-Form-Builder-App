import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

 export const fetchUsers = createAsyncThunk('fetchUsers', async () => {
const response = await fetch('http://localhost:3000/userForms')
return response.json()
})

const usersSlice = createSlice({
    name: "usersData",
    initialState:{
        userForms: [],
        selectedTemplate: 0
    },
    reducers:{
        addUserForms:(state, action) => {
            state.userForms = action.payload         
        },
        updateUserForms:(state, action) => {
            state.userForms = action.payload
        },
        selectTemplate:(state, action)=>{
            state.selectedTemplate = action.payload
        }
    },
    extraReducers:(builder) => {
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.userForms = action.payload
        });
        builder.addCase(fetchUsers.rejected, (state, action) => {
            console.log("error--->", action.error)
        })
    }
})

export default usersSlice.reducer

export const { addUserForms, updateUserForms, selectTemplate} = usersSlice.actions