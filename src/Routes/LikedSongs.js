import React from 'react'
import { useUser } from './UserProvider';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Icon } from '@iconify/react';
import Footer from './Footer';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

const LikedSongs = () => {

  const [list, setList] = useState([]);
  const { getUser, setCurrentPlaying } = useUser();
  const navigate = useNavigate();
  // console.log(getUser.token)

  const detailsOfLikedSongs = async () => {
    axios.get('https://academics.newtonschool.co/api/v1/music/favorites/like', {
      headers: {
        Authorization: `Bearer ${getUser.token}`
      }
    }).then((response) => {
      // console.log(response.data.data.songs);
      setList(response.data.data.songs);
    }).catch((error) => {
      console.log(error)
    });
  }

  const removeLikedSongs = (songId) => {
    axios.patch('https://academics.newtonschool.co/api/v1/music/favorites/like', { 'songId': songId }, {
      headers: { Authorization: `Bearer ${getUser.token}` }
    }).then((response) => {
      // console.log(response)
      setList(response.data.data.songs)
      toast.success('Removed form Liked Songs')
      detailsOfLikedSongs();
      // window.
    }).catch((error) => {
      console.log(error);
    })
  }

  useEffect(() => {
    detailsOfLikedSongs();
  }, []);

  const handlePlaySortedSong = (song) => {
    setCurrentPlaying(song);
  };

  return (<>
  <div className='lg:md:h-9/10 h-10/11 overflow-y-auto rounded-b-lg bg-neutral-900'>

    <div className='lg:hidden fixed w-full bg-[#3E2D78] text-white pl-4'>
         <Icon icon="mingcute:arrow-left-fill" width="3rem" height="3rem"  style={{color: 'white'}} onClick={() => {
         navigate(-1);
         }}/>
    </div>

  <div className='w-full lg:h-80 h-90 bg-[#3E2D78] lg:flex block lg:pt-6 pt-12 pl-4'>
    <div className='lg:w-64 md:w-40 lg:h-64 md:h-50 h-40 w-40 rounded-md bg-[#603AEE] p-4 '>
      <div className="flex justify-center lg:pt-16 pt-4">
        <Icon icon="ph:heart-fill" width="6rem" height="6rem" style={{ color: 'white'}} />
      </div>
    </div>
    <div className='flex flex-col lg:pt-16 lg:pl-2 pt-6 pl-2 '>
      <h2 className='text-white lg:pl-1 pb-1 md:pb-2 text-sm lg:md:text-base'>Playlist</h2>
      <h2 className='text-white font-bold lg:md:text-7xl text-4xl pb-2 lg:pl-1'>Liked Songs</h2>
      <h2 className='text-zinc-400 text-sm font-semibold pl-1 lg:pt-2 pt-1 lh:pb-0 pb-1.5'>Created by Mustafa Zaheer</h2>
    </div>
  </div>
  {/* button play list */}
  <div className='bg-[#171422] pt-2 md:pt-5 pl-2 md:pl-5 pr-2'>
    {/* song list header */}
    {list && list.length > 0 ? (
      <div className="border-b border-gray-800 pl-0 mb-2 text-sm md:text-base flex justify-between text-zinc-400">
        <div className='flex lg:gap-6 md:gap-4 '>
          <div class="pl-2 w-1/6 md:w-full">#</div>
          <div class="lg:md:pl-3 pl-8 ml-2">Title</div>
        </div>
        {/* <div class="pt-2 pl-2 md:pl-28 w-full text-right">Artist</div> */}
        <div class="pb-3 lg:pr-12 pr-12 w-full text-right">UnLiked</div>
      </div>
    ) : ''}

    <div className='LikedCards bg-[#171422]'>
      {list && list.length > 0 ? (
        list.map((song, index) => (
          <div key={index} className="flex border-b text-zinc-400 border-gray-800 hover:bg-zinc-800 group hover:text-white">
            <span className="p-3 mt-2 flex-shrink-0">{index + 1}</span>
            <Icon icon="entypo:controller-play" width="4rem" height="4rem" style={{ color: '#72d95e' }} className='transform opacity-0 group-hover:opacity-100 mr-2 ' />
            <img src={song.thumbnail} className="w-16 h-8 mt-1.5 rounded-md" alt={song.title} onClick={() => { handlePlaySortedSong(song) }} />
            <div className="p-2 mt-2 w-5/6 " onClick={() => { handlePlaySortedSong(song) }}>{song.title}</div>
            <div className="p-2 mt-2 w-full" onClick={() => { handlePlaySortedSong(song) }}>{song.artist[0].name}</div>
            <div className='disliked' onClick={() => removeLikedSongs(song._id)}>
              <Icon icon="ph:heart-fill" width="1.5rem" height="1.5rem" style={{ color: '#1ED760' }} className='mr-16 mt-2 md:mt-5 hover:scale-125 cursor-pointer' />
            </div>
          </div>
        ))
      ) : (
        <div className='text-center pb-8 pt-8 md:pb-16 md:pt-16 h-full'>
          <h3 className='text-white text-2xl md:text-4xl font-bold'>Songs you like will appear here</h3>
          <h3 className='text-white text-sm md:text-lg font-semibold pt-2 md:pt-4'>Save songs by tapping the heart icon.</h3>
        </div>
      )}
    </div>
  </div>
  <div className="mt-4 md:mt-12">
    <Footer />
  </div>
</div>

  </>
  )
}

export default LikedSongs
