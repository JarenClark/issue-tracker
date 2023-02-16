import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import supabase from "../lib/supabase";
const initialState = {
    loading: false,
    comments: [],
    error: ''
}

export const fetchComments = createAsyncThunk('comments/fetchComments', async () => {
    const { data, error } = await supabase.from("comments").select('id,text,created_at,created_by,parent_comment,related_issue');
    return data
})

export const postNewComment = createAsyncThunk('comments/postNewComment', async (commentData) => {
    const { data, error } = await supabase.from("comments").insert([commentData]);
    // console.log(data)
    return data
})


const slice = createSlice({
    name: "comments",
    initialState,
    extraReducers: (builder) => {

        // post new comment
        builder.addCase(postNewComment.pending, (state) => {
            state.loading = true
        })

        builder.addCase(postNewComment.fulfilled, (state, action) => {
            state.loading = false
            state.comments = action.payload
            state.error = ''
        })
        builder.addCase(postNewComment.rejected, (state, action) => {
            state.loading = false
            state.comments = [...state.comments, action.payload]
            state.error = action?.error?.message ?? 'Something went wrong'
        })

        // fetch comments
        builder.addCase(fetchComments.pending, (state) => {
            state.loading = true
        })

        builder.addCase(fetchComments.fulfilled, (state, action) => {
            state.loading = false
            state.comments = action.payload
            state.error = ''
        })
        builder.addCase(fetchComments.rejected, (state, action) => {
            state.loading = false
            state.comments = []
            state.error = action?.error?.message ?? 'Something went wrong'
        })

    },
    reducers: {
        getComments:(state) => {

        },
        createComment: (state, actions) => {

        },
        updateComment: (state, actions) => {

        }
        
    }
})

export default slice.reducer

export const { getComments, createComment, updateComment } = slice.actions