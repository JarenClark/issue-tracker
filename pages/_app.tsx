import "../styles/globals.css";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { useState } from "react";
import type { AppProps } from "next/app";
import { AuthContextProvider } from "../ctx/auth";
import { DataContextProvider } from "../ctx/data";
import { Provider } from "react-redux";
import { configureStore, combineReducers } from "@reduxjs/toolkit";

// Reducers
import authReducer from "../rdx/authSlice";
import issueReducer from "../rdx/issueSlice";
const reducer = combineReducers({
  auth: authReducer,
  issue: issueReducer,
});

// Store
const store = configureStore({
  reducer: reducer,
});

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
