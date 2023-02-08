import React, { useState, useEffect } from "react";
import pb from "../lib/pocketbase";
import { useForm } from "react-hook-form";
type Props = {
  children: React.ReactNode;
};

const Auth = (props: Props) => {
  const [loggedIn, setLoggedIn] = useState(pb.authStore.isValid);
  useEffect(() => {
    setLoggedIn(pb.authStore.isValid);
    return () => {
      console.log("this will run on unmount");
    };
  }, [pb.authStore]);

  return (
    <div>
      <h3>Auth is {pb.authStore.isValid.toString()}</h3>
      <p>{pb.authStore.model?.name}</p>
      {loggedIn ? props.children : <Login />}
    </div>
  );
};

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, reset } = useForm();

  async function onSubmit(data: { email: string; password: string }) {
    setIsLoading(true);
    login(data);
    reset();
  }
  async function login(data: { email: string; password: string }) {
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

export default Auth;
