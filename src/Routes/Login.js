import React from "react";
import TextInput from "../InputComponent/shared/TextInput";
import PasswordInput from "../InputComponent/shared/PasswardInput";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "./UserProvider";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState('')

  const {signInUser} = useUser();
  const navigate = useNavigate();

  const onClickHandler = (event) => {
    event.preventDefault();
    const data = { email, password, appType: "music" };
    setError('');
    axios
      .post("https://academics.newtonschool.co/api/v1/user/login", data)
      .then((response) => {
        console.log(response.data);
        localStorage.setItem('token', response.data.token);
        signInUser({status:response.data.status,token:response.data.token})
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        if(error.response && error.response.data && error.response.data.message){
            setError(error.response.data.message)
        }
        else{
            setError("Unknown error please try after sometime !!")
        }
      });
  };

  return (
    <div className="w-full h-fit-screen bg-zinc-900 flex flex-col items-center">
      <div className="bg-black h-1/4 w-full flex items-center pl-10 p-6 text-white">
        <Link to="/">
          <img
            className="logo"
            src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg" width={"140px"}
            alt="logo"
          />
        </Link>
      </div>
      <div className="bg-black xl:w-2/4 lg:2/4 md:2/4 w-full mt-7 rounded-xl">
        <h1 className="text-white p-10 pt-16 text-4xl font-bold text-center">
          Log in to Spotify
        </h1>
        <div className="w-3/4 text-zinc-300 border-b border-gray-800 m-auto"></div>
        <h2 className="text-red-600 font-semibold pt-5 text-center">{error}</h2>
        <div className="w-2/4 m-auto">
          <TextInput
            label="Email"
            placeholder="Enter your email"
            className="my-5 text-sm"
            value={email}
            setValue={setEmail}
          />
          <PasswordInput
            label="Enter Password"
            placeholder="Enter your password"
            className="text-sm"
            value={password}
            setValue={setPassword}
          />
          <button className="border rounded-full border-none bg-green-500 p-3 font-bold w-full mt-12 hover:bg-green-700 cursor-auto" onClick={onClickHandler}>
            Log In
          </button>
        </div>
        <div className="w-3/4 text-zinc-300 border-b border-gray-800 ml-20 mt-8"></div>
        <div className="flex justify-center gap-2 my-10">
          <div className="text-gray-400 text-center text-sm">
            Don't have an account?
          </div>
          <div className="text-white underline hover:text-green-500 font-semibold cursor-pointer text-sm">
            {" "}
            <Link to="/signup">Sign up for Spotify</Link>
          </div>
        </div>
      </div>
      <div className="w-full h-1/5 bg-black my-6 text-gray-400 text-center text-xs font-semibold p-8 mb-0">
        This site is protected by reCAPTCHA and the Google
        <span className="underline cursor-pointer"> Privacy Policy</span> and{" "}
        <span className="underline cursor-pointer">Terms of Service</span>{" "}
        apply.
      </div>
    </div>
  );
};

export default Login;
