import React from 'react';
import axios from 'axios';
import { useUser } from '../Routes/UserProvider';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import Footer from '../Routes/Footer';

const AlbumSongs = () => {

    const { getUser, signOutUser, albumData } = useUser();
    console.log(albumData);
    const { artistData } = useUser();
    const {setCurrentPlaying} = useUser();

    const onChangeHandler = () => {
        localStorage.removeItem("token");
        signOutUser();
      };

      const navigate = useNavigate();

      const handlePlaySortedSong = (song) => {
        setCurrentPlaying(song);
      };

      const addToLikedSongs = (songId) => {
        axios.patch('https://academics.newtonschool.co/api/v1/music/favorites/like', { "songId": songId }, {
            headers: {
                Authorization: `Bearer ${getUser.token}`
            }
        }).then((response) => {
            console.log(response);
            alert("Added to Liked Songs");
        }).catch((error) => {
            console.log(error);
        })
    }
    
    return ( <>
                    {/* body part */}
                        <div className='h-9/10 overflow-y-auto rounded-b-lg'>
                            {/* header */}
                            <div className='w-full h-100 bg-[#383838] p-10'>
                                <div className="flex ">
                                    <img className="mr-6 h-72 w-72 rounded-full" src={albumData.image} alt="image" />
                                    <div className="flex flex-col justify-center">
                                        {/* content */}
                                    
                                        <h1 className="mt-0 mb-2 text-white text-6xl font-bold ">{albumData.title}</h1>

                                        <p className="text-gray-400 text-sm">Created by Mustafa Zaheer</p>
                                    </div>
                                </div>
                            </div>
                        
                            {/* button play list */}
                            <div className='bg-[#121212]'>
                                <div className="flex justify-start">
                                    {/* <div className="flex"> */}
                                    <div className="mr-2 px-8 my-6">
                                        <Icon icon="icon-park-solid:play" style={{ color: '#1ED760' }} className='h-16 w-16 hover:scale-105' />
                                    </div>

                                    <button className="mr-2 border border-slate-500 block  rounded-full ml-2 px-4 py-1 my-10 hover:scale-105 hover:border-white text-white font-semibold">Follow</button>
                                </div>

                                {/* Main song list */}
                                <div className="Songs ">
                                    {/* song list header */}
                                    <div className="border-b text-zinc-400 border-gray-800 ml-16 mr-2 text-sm flex justify-between">
                        <div className='flex gap-7'>
                        <div class="p-2 w-full">#</div>
                        <div class="p-2 w-full">Title</div>
                        </div>
                        <div class="pt-2 pl-28 w-full text-right">Artist</div>
                        <div class="p-2 w-full text-right mr-10">Favorite</div>  
                    </div>
                                    <div className='pl-16 pt-4'>
                                        {albumData.songs.map((song, index) => (
                                            <div key={song._id} className="flex border-b text-zinc-400 border-gray-800 hover:bg-zinc-800 group hover:text-white">

                                                <span className="p-3 w-8 mt-2 flex-shrink-0">{index + 1}</span>
                                                <Icon icon="entypo:controller-play" width="2rem" height="2rem" style={{ color: '#72d95e'}} className='transform opacity-0 group-hover:opacity-100 mr-2 mt-3'/>
                                                <img src={song.thumbnail} className="w-16 h-12 mt-1 rounded-md" alt={song.title}  onClick= {()=>{handlePlaySortedSong(song)}}/>
                                                <div className="p-3 mt-1 w-full"  onClick= {()=>{handlePlaySortedSong(song)}}>{song.title}</div>
                                                {/* <div className="p-3 mt-2 w-full">{song.name}</div> */}
                                                {getUser && getUser.status == "success" && <div className='heart' onClick={() => addToLikedSongs(song._id)}>
                                                <Icon icon="ri:heart-line" width="1.5rem" height="1.5rem" style={{color: '#808080'}} className='mr-16 mt-5 hover:scale-125 cursor-pointer' />
                                                </div>}
                                        
                                            </div>
                                        ))}
                                    </div>
                                    {/* Add more song entries as needed */}
                                </div>
                            </div>
                              {/* footer */}
                            <div className="mt-12">
                                <Footer />
                            </div>
                     </div>
            {/* </div> */}
          {/* </div> */}
                        {/* Audio player */}
                    {/* <div className="w-screen h-24 p-4 bg-black">
                        <AudioPlayer />
                    </div> */}
        {/*  </div>    */}
        </>    
    );
}

export default AlbumSongs;
