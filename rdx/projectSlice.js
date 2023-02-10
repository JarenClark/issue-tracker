import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import supabase from "../lib/supabase";

const initialState = {
    loading: false,
    projects: [],
    error: ''
}

export const fetchProjects = createAsyncThunk('projects/fetchProjects', async () => {
    const { data, error } = await supabase.from("projects").select('id,title,description');
    return data
})


const slice = createSlice({
    name: "projects",
    initialState,
    extraReducers: (builder) => {

        builder.addCase(fetchProjects.pending, (state) => {
            state.loading = true
        })

        builder.addCase(fetchProjects.fulfilled, (state, action) => {
            state.loading = false
            state.projects = action.payload
            state.error = ''
        })
        builder.addCase(fetchProjects.rejected, (state, action) => {
            state.loading = false
            state.projects = []
            state.error = action?.error?.message ?? 'Something went wrong'
        })

    },
    reducers: {
        getProjects: (state, actions) => {
            // const { data } = actions.payload
            // console.log('actions.payload are', actions)
            // state = data
        },
        createProject: (state, actions) => { },
        updateProject: (state, actions) => { }
    }
})

export default slice.reducer
export const { getProjects, createProject, updateProject } = slice.actions