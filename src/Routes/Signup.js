import React from "react";
import TextInput from "../InputComponent/shared/TextInput";
import PasswordInput from "../InputComponent/shared/PasswardInput";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
//   const [value, setValue] = useState('')
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState('')

  const navigate = useNavigate();

  const onClickHandler = (event) => {
    event.preventDefault();
    const data = {email, password, name, appType: 'music' }
    
    axios.post("https://academics.newtonschool.co/api/v1/user/signup", data).then((response)=>{
        console.log(response)
        navigate('/login');
    }).catch((error)=>{
        console.log(error);
        if(error.response && error.response.data && error.response.data.message){
          setError(error.response.data.message)
      }
      else{
          setError("Unknown error please try after sometime !!")
      }
    })
  }

  const onKeyClick = (event) => {
    event.preventDefault();
    if(event.key === 'Enter'){
      const data = {email, password, name, appType: 'music' }
    
      axios.post("https://academics.newtonschool.co/api/v1/user/signup", data).then((response)=>{
          console.log(response)
          navigate('/login');
      }).catch((error)=>{
          console.log(error);
          if(error.response && error.response.data && error.response.data.message){
            setError(error.response.data.message)
        }
        else{
            setError("Unknown error please try after sometime !!")
        }
      })
    }  
  }

  return (
    <div className="w-full h-fit-scren bg-black flex flex-col items-center">
      <div className="bg-black w-full flex items-center pl-10 p-6">
      <Link to='/'><img
          className="h-14"
          src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg"
          alt="logo"
        /></Link>
      </div>
      <div className="xl:w-2/4 lg:w-2/4 md:w-2/4 sm flex flex-col items-center">
        <h1 className="text-white p-10 pt-12 text-3xl font-bold text-center">
          Sign up to start listening
        </h1>
        <div className="w-2/4 border-b border-gray-700"></div>
        <h2 className="text-red-600 font-semibold pt-5 text-center">{error}</h2>
        <div className="w-2/4 py-6 m-auto">
          <TextInput
            label="User Name"
            placeholder="Enter your name"
            className="my-5 text-sm"
            value={name}
            setValue={setName}
          />
          <TextInput
            label="Email Address"
            placeholder="Enter your email"
            className="my-5 text-sm"
            value={email}
            setValue={setEmail}
          />
          <PasswordInput
            label="Create Password"
            placeholder="Create your password"
            className="text-sm"
            value={password}
            setValue={setPassword}
          />
          <button
            className="border rounded-full border-none bg-green-500 p-3 font-bold w-full mt-12 hover:bg-green-700 cursor-auto"
            onClick={onClickHandler}
            onKeyDown={onKeyClick}
           >
            Sign Up
          </button>
        </div>
        <div className="w-2/4 border-b border-gray-800 my-3"></div>
        <div className="flex justify-center gap-2 my-10">
          <div className="text-gray-400 text-center">Already have account?</div>
          <div className="text-white underline hover:text-green-500 font-semibold cursor-pointer">
            {" "}
            <Link to="/login">Log in here</Link>
          </div>
        </div>
      </div>
      <div className="bg-black text-gray-400 text-center text-xs font-semibold p-4">
        This site is protected by reCAPTCHA and the Google
        <span className="underline cursor-pointer">
          {" "}
          Privacy Policy
        </span> and{" "}
        <span className="underline cursor-pointer">Terms of Service</span>{" "}
        apply.
      </div>
    </div>
  );
};

export default Signup;
