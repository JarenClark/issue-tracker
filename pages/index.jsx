import React, { useEffect, useState } from "react";
import { Login } from "../components";
import supabase from "../lib/supabase";

function Home() {
  const [sessionState, setSessionState] = useState(null); // our session if logged in
  const [loading, setLoading] = useState(true); // loading until supabase get auth

  useEffect(() => {
    let mounted = true;

    // check if user is logged in
    async function getInitialSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession();
    }
    getInitialSession();

    const { subscription } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSessionState(session);
      }
    );

    console.log(sessionState)
    return () => {
      mounted = false;
      subscription?.unsubscribe();
    };
  }, []);

  return (
    <div className="flex h-screen w-screen justify-center items-center overflow-x-scroll">
      <div>
        <p className="mb-8">Email is {sessionState?.user?.email} </p>
        <Login />
      </div>
    </div>
  );
}

export default Home;
