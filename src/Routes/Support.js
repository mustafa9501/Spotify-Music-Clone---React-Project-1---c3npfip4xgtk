import React from 'react'
import { Link } from 'react-router-dom'
import spotify_logo from "../assets/images/spotify_logo_white.svg";
import AudioPlayer from "../music/AudioPlayer";

const Support = () => {
  return (
    <div className='bg-black h-screen w-full'>
        <div className='w-full flex items-center p-8'>
        <Link to='/'><img src={spotify_logo} alt="spotify logo" width={140} /></Link>
        </div>
        <div className='border-2 border-yellow-600 w-1/2 h-1/2  rounded-2xl flex justify-center items-center text-7xl font-mono font-bold text-green-700 m-auto mt-20'>COMING SOON</div>
        {/* <div>
        <AudioPlayer/>
      </div> */}
    </div>
    
  )
}

export default Support
