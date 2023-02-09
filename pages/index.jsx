import React, { useEffect, useState } from "react";
import { Login } from "../components";
import { Auth, ThemeSupa } from '@supabase/auth-ui-react'

import supabase from "../lib/supabase";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../rdx/authSlice";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";

function Home() {
  //  const { auth } = useSelector(state => state)
  // console.log('auth is ', auth)
  const user = useUser();
  const supabaseClient = useSupabaseClient();
  const dispatch = useDispatch();

  const [sessionState, setSessionState] = useState(null); // our session if logged in
  const [loading, setLoading] = useState(true); // loading until supabase get auth

  useEffect(() => {
    let mounted = true;

    // check if user is logged in
    async function getInitialSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSessionState(session);
      setLoading(false);
    }
    getInitialSession();

    const { subscription } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSessionState(session);
        setLoading(false);
      }
    );

    console.log(`session state is`, sessionState);
    return () => {
      mounted = false;
      subscription?.unsubscribe();
    };
  }, []);

  // async function logOut() {
  //   dispatch(signOut)
  // }
  // function logOutButtton() {
  //   dispatch(signOut)
  // }
  if (!user) {
    return (
      <div className="flex h-screen w-screen justify-center items-center overflow-x-scroll">
        <Auth
        redirectTo="http://localhost:3000/"
        appearance={{ theme: ThemeSupa }}
        supabaseClient={supabaseClient}

      />
      </div>
    );
  }
  return (
    <div className="flex h-screen w-screen justify-center items-center overflow-x-scroll">
      <div>
        <div>
          <p>You are logged in as {sessionState?.user?.email}</p>
          <button
            onClick={() => supabaseClient.auth.signOut()}
            className="rounded-md bg-indigo-600 py-2 px-6"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
