import React, { useState, useEffect } from "react";
import supabase from "../lib/supabase";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { signIn } from "../rdx/authSlice";

const Login = (props) => {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const [formInput, setFormInput] = useState({
    email: "",
    password: "",
  });

  function submit(e) {
    console.log("you hit submit");
    dispatch(signIn(formInput));
    e.preventDefault();
  }

  useEffect(() => {
    console.log(`formInput ==`, { ...formInput });
  }, [formInput]);

  return (
    <div>
      <form>
        <fieldset>
          <div className="mb-4">
            <label htmlFor="email">Email</label>
            <input
              onChange={(e) =>
                setFormInput({
                  ...formInput,
                  email: e.target.value,
                })
              }
              type="email"
              className="text-white flex mt-1 rounded-md p-1"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password">Password</label>
            <input
              onChange={(e) =>
                setFormInput({
                  ...formInput,
                  password: e.target.value,
                })
              }
              type="password"
              className="text-white flex mt-1 rounded-md p-1"
            />
          </div>
        </fieldset>
        <button
          disabled={isLoading}
          onClick={submit}
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

//      {/* {loginError && <p className="text-red-500">{loginError.toString()}</p>} */}

// const [isLoading, setIsLoading] = useState(false);
// const { register, handleSubmit, reset, error } = useForm();
// const [loginError, setLoginError] = useState("");

// async function onSubmit(formdata) {
//   setIsLoading(true);
//   login(formdata);
//   reset();
// }

// async function login(formdata) {
//   try {
//     const { data, error } = await supabase.auth.signInWithPassword({
//       email: formdata.email,
//       password: formdata.password,
//     });

//     if (error) {
//       setLoginError(error);
//     }
//   } catch (error) {
//     alert(error);
//   }

//   setIsLoading(false);
// }
