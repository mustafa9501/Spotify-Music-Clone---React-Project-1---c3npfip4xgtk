import React from 'react'
import ReactAudioPlayer from 'react-h5-audio-player';         
import 'react-h5-audio-player/lib/styles.css';
import { useUser } from '../Routes/UserProvider';

const AudioPlayer = () => {

  const {currentPlaying} = useUser();

  return (
    <>
    <ReactAudioPlayer
      src={currentPlaying.audio_url}
      controls
      loop
      style={{ width: '100%', height: '80px', backgroundColor: 'black',}}
    />
    </>   
  )
}

export default AudioPlayer

