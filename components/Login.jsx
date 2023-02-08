import React, { useState } from "react";
import supabase from "../lib/supabase";
import { useForm } from "react-hook-form";

const Login = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  // const [method, setMethod] = useState("login");
  const { register, handleSubmit, reset, error } = useForm();

  async function onSubmit(formdata) {
    setIsLoading(true);
    login(formdata);
    reset();
  }

  async function login(formdata) {
    try {
      console.log(formdata.email, formdata.password);

      const { data, error } = await supabase.auth.signUp({
        email: formdata.email,
        password: formdata.password,
      });

      console.log("data:", data);
      console.log("error:", error);
    } catch (error) {
      alert(error);
    }

    setIsLoading(false);
  }

  return (
    <div>
      <h3>Login</h3>
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
          className="mt-4 py-2 px-8 flex rounded-md bg-indigo-600 "
        >
          {isLoading ? "Loading" : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
