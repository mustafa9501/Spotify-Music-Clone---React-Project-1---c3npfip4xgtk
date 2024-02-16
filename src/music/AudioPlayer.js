import React, {useState, useEffect} from 'react'
import ReactAudioPlayer from 'react-h5-audio-player';         
import 'react-h5-audio-player/lib/styles.css';
import { useUser } from '../Routes/UserProvider';
import { Link } from 'react-router-dom';

const AudioPlayer = () => {

  const {currentPlaying, getUser} = useUser();

  const [isScreenSmall, setIsScreenSmall] = useState(window.innerWidth < 1100);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsScreenSmall(window.innerWidth < 1100);
    };

    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <>
    {!getUser && ( <>
      {isScreenSmall ? 
      <>
       <div><ReactAudioPlayer
       src={currentPlaying.audio_url}
       controls
       loop
       style={{ width: '100%', height: '40px', backgroundColor: 'black',}}
     /></div>
      <div className='flex justify-between  items-center bg-[#AC2B98] p-2 mt-11  rounded-lg'>
      <div className='font-semibold text-white '>
        <p>Sign up free to get unlimited songs and podcasts with occasional ads..</p>
      </div>
      <Link to="/signup"><div className='font-semibold border bg-white rounded-3xl pl-4 pr-4 py-3 ml-3 mr-3 cursor-pointer'>Signup </div></Link>
    </div> </>: 
    <div className='flex justify-between  items-center bg-[#AC2B98]  p-3 mt-0 rounded'>
      <div className='font-semibold text-white '>
        <h3>Preview</h3>
        <p>Sign up to get unlimited songs and podcasts with occasional ads. No credit cards nedded.</p>
      </div>
      <Link to="/signup"><div className='font-semibold pr-8 border bg-white rounded-full pl-8 pt-2 pb-2 hover:scale-105 cursor-pointer'>Sign up free</div></Link>
    </div> }
    </>  )}
    
    {getUser && getUser.status === "success" && ( <>
     {isScreenSmall ? (
      <>
      <div className=''>
        <ReactAudioPlayer
          src={currentPlaying.audio_url}
          controls
          loop
          style={{ width: '100%', height: '40px', backgroundColor: 'black',}}

        />
      </div>
      </> ) :
        <ReactAudioPlayer
          src={currentPlaying.audio_url}
          controls
          loop
          style={{ width: '100%', height: '80px', backgroundColor: 'black',}}
        />}
        </>)}
    </>   
  )
}

export default AudioPlayer

