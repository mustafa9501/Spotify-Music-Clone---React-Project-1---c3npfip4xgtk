import React from 'react'
import TextInput from "../InputComponent/shared/TextInput";
import PasswordInput from "../InputComponent/shared/PasswardInput";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {useUser} from './UserProvider';

const UpdatePassword = () => {

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCurrent, setPasswordCurrent] = useState("");
  const [error, setError] = useState('')

  const navigate = useNavigate();
  const {signInUser,getUser} = useUser();

  const onClickHandler = (event) => {
    event.preventDefault();
    const data = {email, passwordCurrent, name, password, appType: 'music' }
    
    axios.patch("https://academics.newtonschool.co/api/v1/user/updateMyPassword", data, {
      headers: {
        Authorization: `Bearer ${getUser.token}`
      }
    }).then((response)=>{
               console.log(response.data);
              //  debugger;
               localStorage.setItem("token",response.data.token);
               navigate('/');
    }).catch((error)=>{
      console.log(error);
      if(error.response && error.response.data && error.response.data.message){
        setError(error.response.data.message);
      }
      else{
        setError("unknow error please try after sometime");
      }
    })
  }

  const onKeyCLick = (event) => {
    event.preventDefault();

    if(event.key === 'Enter'){
      const data = {email, passwordCurrent, name, password, appType: 'music' }
    
      axios.patch("https://academics.newtonschool.co/api/v1/user/updateMyPassword", data, {
        headers: {
          Authorization: `Bearer ${getUser.token}`
        }
      }).then((response)=>{
                 console.log(response.data);
                //  debugger;
                 localStorage.setItem("token",response.data.token);
                 navigate('/');
      }).catch((error)=>{
        console.log(error);
        if(error.response && error.response.data && error.response.data.message){
          setError(error.response.data.message);
        }
        else{
          setError("unknow error please try after sometime");
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
      <div className=" flex flex-col items-center">
        <h1 className="text-white p-10 pt-6 text-3xl font-bold text-center">
          Update Your Password
        </h1>
        <div className="w-3/4 border-b border-gray-700"></div>
        {/* <h2 className="text-red-600 font-semibold pt-5 text-center">{error}</h2> */}
        <div className="w-3/4  py-6 m-auto">
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
            label="Old Password"
            placeholder="Enter your old password"
            className="text-sm my-5"
            value={passwordCurrent}
            setValue={setPasswordCurrent}
          />
          <PasswordInput
            label="Current Password"
            placeholder="Enter your current password"
            className="text-sm"
            value={password}
            setValue={setPassword}
          />
          <button
            className="border rounded-full border-none bg-green-500 p-3 font-bold w-full mt-12 hover:bg-green-700 cursor-auto"
            onClick={onClickHandler}
            onKeyDown={onKeyCLick}>
            Update Password
          </button>
        </div>
        <div className="w-3/4  border-b border-gray-800 my-3"></div>
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
  )
}

export default UpdatePassword
