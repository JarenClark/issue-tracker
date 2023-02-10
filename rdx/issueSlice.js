import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import supabase from "../lib/supabase";

const initialState = {
    loading: false,
    issues: [],
    error: ''
}

export const fetchIssues = createAsyncThunk('issues/fetchIssues', async () => {
    const { data, error } = await supabase.from("issues").select('id,title,description');
    return data
})



const slice = createSlice({
    name: "issues",
    initialState,
    extraReducers: (builder) => {

        builder.addCase(fetchIssues.pending, (state) => {
            state.loading = true
        })

        builder.addCase(fetchIssues.fulfilled, (state, action) => {
            state.loading = false
            state.issues = action.payload
            state.error = ''
        })
        builder.addCase(fetchIssues.rejected, (state, action) => {
            state.loading = false
            state.issues = []
            state.error = action?.error?.message ?? 'Something went wrong'
        })

    },
    reducers: {
        getIssues:(state) => {

        },
        createIssue: (state, actions) => {

        },
        updateIssue: (state, actions) => {

        }
    }
})

export default slice.reducer

export const { getIssues, createIssue, updateIssue } = slice.actions