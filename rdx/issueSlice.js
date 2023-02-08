import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name: "issue",
    initialState: [],
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