import React, { createContext, useEffect, useState } from "react";
import pb from "../lib/pocketbase";
import { useForm } from "react-hook-form";


export const AuthContext = createContext()

export const AuthContextProvider = (props) => {
    const [loggedIn, setLoggedIn] = useState(pb.authStore.isValid)
    const [authLoading, setAuthLoading] = useState(false)
    const [user, setUser] = useState(pb.authStore.model ? pb.authStore.model : {})

    useEffect(() => {

        console.log(`useEffect mounting from AuthContext`)
        setLoggedIn(pb.authStore.isValid);
        
        return () => {
            console.log(`useEffect unmounting from AuthContext`)
        }
    }, [])



    return (
        <AuthContext.Provider
            value={{
                user,
                authLoading,
                loggedIn,
            }}
        >
            {loggedIn ? props.children : <Login />}
        </AuthContext.Provider>
    )
}


const Login = () => {
    const [isLoading, setIsLoading] = useState(false);
  
    const { register, handleSubmit, reset } = useForm();
  
    async function onSubmit(data) {
      setIsLoading(true);
      login(data);
      reset();
    }
    async function login(data) {
      console.log(data.email, data.password);
      //            setIsLoading(false)
  
      try {
        const authData = await pb
          .collection("users")
          .authWithPassword(data.email, data.password);
      } catch (e) {
        alert(e);
      }
      setIsLoading(false);
    }
    return (
      <div className="w-screen1 h-screen1 flex justify-center items-center">
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset>
            <div className="mb-4">
              <label htmlFor="email">Email</label>
              <input
                {...register("email")}
                type="email"
                className="text-black flex mt-1 rounded-md p-1"
              />
            </div>
  
            <div className="mb-4">
              <label htmlFor="password">Password</label>
              <input
                {...register("password")}
                type="password"
                className="text-black flex mt-1 rounded-md p-1"
              />
            </div>
          </fieldset>
          <button
            disabled={isLoading}
            type="submit"
            className="mt-4 border border-white hover:bg-white hover:text-black"
          >
            {isLoading ? "Loading" : "Login"}
          </button>
        </form>
      </div>
    );
  };
  