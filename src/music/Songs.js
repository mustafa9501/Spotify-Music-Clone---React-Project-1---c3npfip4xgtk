import React, { useEffect, useState } from 'react';
import { useUser } from '../Routes/UserProvider';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import Footer from '../Routes/Footer';
import axios from 'axios';
import { toast } from "react-toastify";

const AlbumSongs = () => {

  const { getUser, signOutUser, albumData } = useUser();
  const { setCurrentPlaying } = useUser();
  const [list, setList] = useState([]);
  const [likedSongs, setLikedSongs] = useState([]);

  const navigate = useNavigate();

  // const onChangeHandler = () => {
  //   localStorage.removeItem("token");
  //   signOutUser();
  // };

  useEffect(() => {
    const storedLikedSongs = JSON.parse(localStorage.getItem('likedSongs')) || [];
    setLikedSongs(storedLikedSongs);
    
    axios
      .get('https://academics.newtonschool.co/api/v1/music/song?limit=100')
      .then((response) => {
        setList(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handlePlaySong = (song) => {
    setCurrentPlaying(song);
  };

  const addToLikedSongs = async (event, songId) => {
    event.preventDefault();
    try {
      const response = await axios.patch(
        'https://academics.newtonschool.co/api/v1/music/favorites/like',
        { songId: songId },
        {
          headers: {
            Authorization: `Bearer ${getUser.token}`,
          },
        }
      );

      if (response.data.message === 'song added to favorites successfully.') {
        toast.success('Added to Liked Songs');
        const updatedLikedSongs = [...likedSongs, songId];
        setLikedSongs(updatedLikedSongs);
        // Save liked songs to local storage
        localStorage.setItem('likedSongs', JSON.stringify(updatedLikedSongs));
      } else if (response.data.message === 'song removed from favorites successfully.') {
        toast.success('Removed from Liked Songs');
        const updatedLikedSongs = likedSongs.filter((id) => id !== songId);
        setLikedSongs(updatedLikedSongs);
        // Save liked songs to local storage
        localStorage.setItem('likedSongs', JSON.stringify(updatedLikedSongs));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (<>
    {/* body part */}
    <div className='lg:md:h-9/10 h-9/11 overflow-y-auto rounded-b-lg bg-neutral-900'>

      <div className='lg:hidden fixed w-full bg-[#121212] text-white pl-4'>
        <Icon icon="mingcute:arrow-left-fill" width="3rem" height="3rem" style={{ color: 'white' }} onClick={() => {
          navigate(-1);
        }} />
      </div>

      <div className='w-full lg:h-48 h-36 bg-[#121212] lg:flex block justify-start items-center p-4 lg:mt-0 mt-9 md:p-10 '>

        <div className='flex flex-col pl-4 md:pl-8'>
          <h2 className='text-white font-bold lg:md:text-8xl text-5xl'>Songs List</h2>
          <h2 className='text-zinc-400 text-sm pl-2 pt-3'>Created by Mustafa Zaheer</h2>
        </div>
      </div>
      {/* button play list */}
      <div className='bg-[#121212] w-full'>
        {/* Main song list */}
        <div className="Songs">
          {/* song list header */}
          <div className="border-b text-zinc-400 border-gray-800 ml-4 md:ml-16 mr-2 text-sm md:text-base flex justify-between">
            <div className='flex gap-4 md:gap-7'>
              <div class="p-2 w-1/6 md:w-full">#</div>
              <div class="p-2 w-5/6 lg:md:pl-5 pl-6">Title</div>
            </div>
            <div class="pt-2 lg:pr-4 md:pr-3 pr-0 w-full text-right">Artist</div>
            <div class="p-2 w-2/3 text-right lg:md:mr-8 mr-0">Favorite</div>
          </div>
          <div className='pl-3 md:pl-16 pt-2 md:pt-4'>
            {list.map((song, index) => (
              <div key={song._id} className="flex border-b text-zinc-400 border-gray-800 hover:bg-zinc-800 group hover:text-white">

                <span className="p-3 md:w-8 mt-4 flex-shrink-0 lg:md:text-base text-sm">{index + 1}</span>
                <Icon icon="entypo:controller-play" width="4rem" height="4rem" style={{ color: '#72d95e' }} className='transform opacity-0 group-hover:opacity-100 mr-3 lg:md:ml-2 pt-2' />
                <img src={song.thumbnail} className="lg:md:h-16 h-14 mt-1.5 mb-1.5 rounded-md" alt={song.title} onClick={() => { handlePlaySong(song) }} />
                <div className="p-2 mt-4 w-5/6 md:w-full lg:md:text-base text-sm" onClick={() => { handlePlaySong(song) }}>{song.title}</div>
                <div className="p-2 mt-4 w-full md:w-5/6 lg:md:text-base text-sm" onClick={() => { handlePlaySong(song) }}>{song.artist[0].name}</div>
               
                {getUser && getUser.status === 'success' && (
                    <div className='heart' onClick={(event) => addToLikedSongs(event, song._id)}>
                      {likedSongs.includes(song._id) ? (
                        <Icon
                          icon='ri:heart-fill'
                          width='1.5rem'
                          height='1.5rem'
                          style={{ color: '#0aa324' }}
                          className='mr-7 lg:md:mr-16 mt-6 hover:scale-125 cursor-pointer'
                        />
                      ) : (
                        <Icon
                          icon='ri:heart-line'
                          width='1.5rem'
                          height='1.5rem'
                          style={{ color: '#808080' }}
                          className='mr-7 lg:md:mr-16 mt-6 hover:scale-125 cursor-pointer'
                        />
                      )}
                    </div>
                  )}          
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* footer */}
      <div className="mt-4 md:mt-12">
        <Footer />
      </div>
    </div>

  </>
  );
}

export default AlbumSongs;