import React, { useEffect, useState } from "react";
import { Login } from "../components";
import supabase from "../lib/supabase";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../rdx/authSlice";

function Home() {
  const { auth } = useSelector(state => state)
  console.log('auth is ', auth)
  const dispatch = useDispatch()

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
      setLoading(false)
    }
    getInitialSession();

    const { subscription } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSessionState(session);
        setLoading(false)
      }
    );

    console.log(`session state is`, sessionState)
    return () => {
      mounted = false;
      subscription?.unsubscribe();
    };
  }, []);

  // async function logOut() {
  //   dispatch(signOut)
  // }
  function logOutButtton() {
    dispatch(signOut)
  }

  return (
    <div className="flex h-screen w-screen justify-center items-center overflow-x-scroll">
      <div>
        {sessionState ? (
          <div>
          <p>You are logged in as {sessionState?.user?.email}</p>
          <button onClick={() => logOutButtton()} className="rounded-md bg-indigo-600 py-2 px-6">Sign Out</button>
          </div>
        ): (
          <Login />
        )}
      </div>
    </div>
  );
}

export default Home;
