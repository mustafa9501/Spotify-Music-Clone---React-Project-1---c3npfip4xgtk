import React from 'react'
import { Link } from 'react-router-dom'
import spotify_logo from "../assets/images/spotify_logo_white.svg";
import Nav from './Nav';
import Footer from './Footer';

const Download = () => {
  return (
    <div className='bg-black h-screen w-full '>
      <div className='w-full flex items-center p-8'>
        <Link to='/'><img src={spotify_logo} alt="spotify logo" width={140} /></Link>
      </div>
      <div className='border-2 w-3/4 md:w-1/2 h-1/4 rounded-2xl border-green-700 flex justify-center items-center text-4xl md:text-7xl font-mono font-bold text-amber-600 m-auto lg:mt-0 mt-14'>
        COMING SOON
      </div>
      <div className='text-white lg:pt-4 lg:pl-10'><Footer/></div>
    </div>
  )
}

export default Download;
