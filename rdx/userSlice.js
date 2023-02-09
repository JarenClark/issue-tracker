import { createSlice } from "@reduxjs/toolkit";
import { supabase } from '../lib/supabase'

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