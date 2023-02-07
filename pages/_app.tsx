import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AuthContextProvider } from "../ctx/auth";
import { DataContextProvider } from "../ctx/data";

// import { Pocketbase } from 'pocketbase-react';
// const serverURL = 'http://127.0.0.1:8090'
// const collections = ['projects', 'issues', 'comments']
//<Pocketbase
//serverURL={serverURL}
//initialCollections={collections}>
//  <Component {...pageProps} />
//</Pocketbase>

// const webRedirectURL = "http://..."
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <AuthContextProvider>
        <DataContextProvider>
          <Component {...pageProps} />
        </DataContextProvider>
      </AuthContextProvider>
    </>
  );
}
