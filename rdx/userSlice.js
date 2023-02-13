import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import supabase from "../lib/supabase";
const initialState = {
    loading: false,
    users: [],
    error: ''
}
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const { data, error } = await supabase.from("profiles").select('id,first_name,last_name');
    return data
})

const slice = createSlice({
    name: 'users',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.pending, (state) => {
            state.loading = true
        })

        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.loading = false
            state.users = action.payload
            state.error = ''
        })
        builder.addCase(fetchUsers.rejected, (state, action) => {
            state.loading = false
            state.users = []
            state.error = action?.error?.message ?? 'Something went wrong'
        })
    },
    reducers: {

    }
})

export default slice.reducer
export const { getUsers, updateUser } = slice.actions