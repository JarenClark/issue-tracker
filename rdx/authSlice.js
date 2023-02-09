import { createSlice } from "@reduxjs/toolkit";
import supabase from "../lib/supabase";


const slice = createSlice({
    name: "auth",
    initialState: {
        admin: false,
        loggedIn: false,
        id: '',
        username: '',
    },
    reducers: {
        getSession: (state) => {
            console.log('getting session reducer')
            async function getInitialSession() {
                const {
                  data: { session },
                } = await supabase.auth.getSession();
              }
              getInitialSession();
        },
        signIn: (state, action) => {
            const { email, password } = action.payload;
            console.log(`sign in reducer called`)


            try {
                async function signInToSupabase() {
                    const { data, error } = await supabase.auth.signInWithPassword({
                        email: email,
                        password: password,
                    })
                    state.admin = data ? true : false
                    state.loggedIn = data ? true : false
                    state.id = 123
                    state.username = 'username'

                }
                signInToSupabase()

            } catch (error) {
                alert(error)
            }
        },
        signOut: (state, action) => {
            console.log(`sign out reducer called`)
            async function signOutOfSupabase() {
                const { error } = await supabase.auth.signOut()
            }
            signOutOfSupabase()
            state.admin = false
            state.loggedIn = false
            state.id = ''
            state.username = ''
        },
        register: (state, action) => {
            const { username, password } = action.payload;
        }
    }
})

export default slice.reducer

export const { signIn, signOut, register } = slice.actions



// .then((data) => {
//     state.admin = true
//     state.loggedIn = true
//     state.id = 123
//     state.username = 'username'
// })
// .catch((error) => {
//     alert(error)
// });