import React from 'react'
import { useUser } from './UserProvider';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Icon } from '@iconify/react';
import Footer from './Footer';

const LikedSongs = () => {

  const [list, setList] = useState([]);
  const { getUser, setCurrentPlaying } = useUser();
  console.log(getUser.token)

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
      alert('Removed form Liked Songs')
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
    <div className='h-9/10 overflow-y-auto rounded-b-lg '>
      <div className='w-full h-80 bg-[#3E2D78] flex pt-12 pl-10'>
        <div className='w-56 h-56 rounded-md bg-[#603AEE] p-14'>
          <div>
            <Icon icon="ph:heart-fill" width="7rem" height="7rem" style={{ color: 'white' }}
              className='' />
          </div>
        </div>
        <div className='flex flex-col pt-16 pl-8'>
          <h2 className='text-white pl-1 pb-2'>Playlist</h2>
          <h2 className='text-white font-bold text-8xl '>Liked Songs</h2>
          <h2 className='text-white text-sm font-semibold pl-1 pt-4'>Mustafa Zaheer</h2>
        </div>
      </div>
      {/* button play list */}
      <div className=' bg-[#171422] pt-5 pl-5 pr-2'>
           {/* song list header */ }
           {list && list.length > 0 ? (
        <div div className="border-b border-gray-800 pl-14 mb-2 text-sm flex justify-between text-zinc-400">
            <div className='flex gap-7'>
              <div class="p-2 w-full">#</div>
              <div class="pt-2 pl-3 w-full">Title</div>
            </div>
            <div class="pt-2 pl-28 w-full text-right">Artist</div>
            <div class="p-2 w-full text-right mr-10">UnLiked</div>
        </div>
           ): ''}
        <div className='LikedCards bg-[#171422]'>
          {list && list.length > 0 ? (
           
            list.map((song, index) => (
        <div key={index} className="flex border-b text-zinc-400 border-gray-800 hover:bg-zinc-800 group hover:text-white">
          <span className="p-3 w-8 mt-2 flex-shrink-0">{index + 1}</span>
          <Icon icon="entypo:controller-play" width="2rem" height="2rem" style={{ color: '#72d95e' }} className='transform opacity-0 group-hover:opacity-100 mr-2 mt-4' />
          <img src={song.thumbnail} className="w-24 h-12 mt-1.5 rounded-md" alt={song.title} onClick={() => { handlePlaySortedSong(song) }} />
          <div className="p-3 mt-2 w-full" onClick={() => { handlePlaySortedSong(song) }}>{song.title}</div>
          <div className="p-3 mt-2 w-full" onClick={() => { handlePlaySortedSong(song) }}>{song.artist[0].name}</div>

          <div className='disliked' onClick={() => removeLikedSongs(song._id)}>
            <Icon icon="ph:heart-fill" width="1.5rem" height="1.5rem" style={{ color: '#1ED760' }} className='mr-16 mt-5 hover:scale-125 cursor-pointer' />
          </div>
        </div>
        ))
        ) : (
        <div className='text-center pb-16 pt-16 h-full'>
          <h3 className='text-white text-4xl font-bold'>Songs you like will appear here</h3>
          <h3 className='text-white text-lg font-semibold pt-4'>Save songs by tapping the heart icon.</h3>
        </div>
          )}
      </div>
    </div>
    <div className="mt-12">
      <Footer />
    </div>
  </div >
  </>
  )
}

export default LikedSongs
