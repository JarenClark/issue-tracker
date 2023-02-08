import { createSlice } from "@reduxjs/toolkit";


const slice = createSlice({
    name: "user",
    initialState: [{}],
    reducers: {
        getUser: (state) => {

        }
    }
})

export default slice.reducer

export { getUser } = slice.actions