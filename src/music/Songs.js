import React, { useState } from 'react';
import { useUser } from '../Routes/UserProvider';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import Footer from '../Routes/Footer';
import axios from 'axios';

const AlbumSongs = () => {

    const { getUser, signOutUser, albumData } = useUser();
    const { setCurrentPlaying } = useUser();
    const [list, setList] = useState([]);

    const onChangeHandler = () => {
        localStorage.removeItem("token");
        signOutUser();
    };

    axios.get("https://academics.newtonschool.co/api/v1/music/song?limit=100")
        .then((response) => {
            console.log("song", response.data.data);
            setList(response.data.data);
        })
        .catch((error) => { console.log(error); });


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

    return (<>
        {/* body part */}
        <div className='h-9/10 overflow-y-auto rounded-b-lg'>
            <div className='w-full h-50 bg-[#121212] flex justify-start items-center p-10'>
                <div className='flex flex-col pl-8'>
                <h2 className='text-white font-bold text-8xl'>Songs List</h2>
                <h2 className='text-white text-sm pl-2 pt-2'>Created by Mustafa Zaheer</h2>
                </div>
            </div>
            {/* button play list */}
            <div className='bg-[#121212]'>
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
                        {list.map((song, index) => (
                            <div key={song._id} className="flex border-b text-zinc-400 border-gray-800 hover:bg-zinc-800 group hover:text-white">

                                <span className="p-3 w-8 mt-2 flex-shrink-0">{index + 1}</span>
                                <Icon icon="entypo:controller-play" width="4rem" height="4rem" style={{ color: '#72d95e' }} className='transform opacity-0 group-hover:opacity-100 mr-2' />
                                <img src={song.thumbnail} className="w-24 h-12 mt-1.5 rounded-md" alt={song.title} onClick={() => { handlePlaySortedSong(song) }}/>
                                <div className="p-3 mt-2 w-full" onClick={() => { handlePlaySortedSong(song) }}>{song.title} </div>
                                <div className="p-3 mt-2 w-full" onClick={() => { handlePlaySortedSong(song) }}>{song.artist[0].name}</div>
                                {getUser && getUser.status == "success" && <div className='heart' onClick={() => addToLikedSongs(song._id)}>
                                    <Icon icon="ri:heart-line" width="1.5rem" height="1.5rem" style={{ color: '#808080' }} className='mr-16 mt-5 hover:scale-125 cursor-pointer' />
                                </div>}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {/* footer */}
            <div className="mt-12">
                <Footer />
            </div>
        </div>
    </>
    );
}

export default AlbumSongs;