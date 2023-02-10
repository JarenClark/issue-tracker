import "../styles/globals.css";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { useState,useEffect } from "react";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { createApi, fakeBaseQuery, ApiProvider } from "@reduxjs/toolkit/query/react";

// Reducers
import authReducer from "../rdx/authSlice";
import commentsReducer from "../rdx/commentSlice";
import issuesReducer from "../rdx/issueSlice";
import projectsReducer from "../rdx/projectSlice";
import supabase from '../lib/supabase'

const reducer = combineReducers({
  comments: commentsReducer,
  issues: issuesReducer,
  projects: projectsReducer,
});

// Store
const store = configureStore({
  reducer: reducer,
});
// useEffect(() => {
//   dispatch(fetchProjects());
//   dispatch(fetchIssues());
//   dispatch(fetchComments());
// }, []);

export default function App({ Component, pageProps }: AppProps) {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());
  return (
    <>
      <SessionContextProvider
        supabaseClient={supabaseClient}
        initialSession={pageProps.initialSession}
      >
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </SessionContextProvider>
    </>
  );
}

// import { Pocketbase } from 'pocketbase-react';
// const serverURL = 'http://127.0.0.1:8090'
// const collections = ['projects', 'issues', 'comments']
//<Pocketbase
//serverURL={serverURL}
//initialCollections={collections}>
//  <Component {...pageProps} />
//</Pocketbase>

// const webRedirectURL = "http://..."
