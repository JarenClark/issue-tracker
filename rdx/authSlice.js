import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name: "auth",
    initialState: {
        admin: false,
        loggedIn: false,
        id: '',
        username: '',
    },
    reducers: {
        signIn:(state, action) =>{
            const {username, password} = action.payload;
            state.loggedIn == true
        },
        signOut:(state, action) => {
            state.admin = false
            state.loggedIn = false
            state.id = ''
            state.username =''
        },
        register: (state, action) => {
            const {username, password} = action.payload;
        }
    }
})

export default slice.reducer

export const {signIn, signOut, register} = slice.actions