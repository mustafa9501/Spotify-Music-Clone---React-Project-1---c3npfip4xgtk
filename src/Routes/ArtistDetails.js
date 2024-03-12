import React, { useState, useEffect } from 'react';
import { useUser } from "./UserProvider";
import axios from 'axios';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import { toast } from "react-toastify";

const ArtistDetails = () => {

    const { getUser, setCurrentPlaying, artistData } = useUser();
    const [likedSongs, setLikedSongs] = useState([]);

    useEffect(() => {
        const storedLikedSongs = JSON.parse(localStorage.getItem('likedSongs')) || [];
        setLikedSongs(storedLikedSongs);
    }, []);

    const navigate = useNavigate();

    const handlePlaySortedSong = (song) => {
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
        <div className='lg:md:h-9/10 h-9/11 w-full overflow-y-auto rounded-b-lg bg-neutral-900'>
            {/* header */}
            <div className='lg:hidden fixed w-full bg-[#383838] text-white pl-4'>
                <Icon icon="mingcute:arrow-left-fill" width="3rem" height="3rem" style={{ color: 'white' }} onClick={() => {
                    navigate(-1);
                }} />
            </div>

            <div className='w-full h-100 bg-[#383838] lg:p-10 pt-12 pl-10 pb-2'>
                <div className="lg:md:flex block ">
                    <img className="lg:mb-2 lg:h-72 lg:w-72 h-52 w-52 rounded-full" src={artistData.image} alt="image" />
                    <div className="flex flex-col justify-center">
                        {/* content */}
                        <div className="text-gray-400 tracking-widest text-xs flex lg:pt-0 pt-1">
                            <Icon icon="solar:verified-check-bold" width="1.5rem" height="1.5rem" style={{ color: '#2791b4' }} />
                            <h5 className='p-1 text-white'>Verified Artist</h5></div>
                        <h1 className="mt-0 mb-2 text-white lg:md:text-6xl text-3xl font-bold ">{artistData.name}</h1>

                        <p className="text-gray-400 text-sm">Created by Mustafa Zaheer</p>
                    </div>
                </div>
            </div>

            {/* button play list */}
            <div className='bg-[#121212] w-full'>

                {/* Main song list */}
                <div className="Songs ">
                    {/* song list header */}
                    <div className="lg:md:pl-10 pl-5 pt-6 text-white font-semibold lg:md:text-xl text-lg">Popular</div>

                    <div className="border-b text-zinc-400 border-gray-800 mt-3 ml-4 lg:ml-16 md:ml-6 mr-3 text-sm md:text-base flex justify-between">
                        <div className='flex gap-4 md:gap-7'>
                            <div class="p-2 w-1/6 md:w-full">#</div>
                            <div class="p-2 w-5/6 lg:pl-3 md:pl-1 pl-4">Title</div>
                        </div>
                        <div class="pt-2 lg:pr-16 md:pr-8 pr-2 w-full text-right">Artist</div>
                        <div class="p-2 w-2/3 text-right lg:mr-7 mr-0">Favorite</div>
                    </div>

                    <div className='lg:md:pl-16 pl-3 pt-4'>
                        {artistData.songs && artistData.songs.map((song, index) => (
                        <>
                            <div key={song._id} className="flex border-b text-zinc-400 border-gray-800 hover:bg-zinc-800 group hover:text-white">
                                <span className="p-3 w-8 lg:md:mt-2 mt-5 flex-shrink-0 lg:md:text-base text-sm">{index + 1}</span>

                                <Icon icon="entypo:controller-play" width="4rem" height="4rem" style={{ color: '#72d95e' }} className='transform opacity-0 group-hover:opacity-100 mr-2 lg:mt-0 mt-2' onClick={() => { handlePlaySortedSong(song) }} />

                                <img src={song.thumbnail} className="lg:h-16 h-14 mt-1.5 mb-1 rounded-md" alt={song.title} onClick={() => { handlePlaySortedSong(song) }} />
                                <div className="p-3 lg:mt-2 mt-2 w-full lg:md:text-base text-sm" onClick={() => { handlePlaySortedSong(song) }}>{song.title}</div>
                                <div className="p-3 lg:mt-2 mt-2 w-full lg:md:text-base text-sm" onClick={() => { handlePlaySortedSong(song) }}>{artistData.name}</div>
                                {/* </div>    */}

                                {getUser && getUser.status == "success" && <div className='heart' onClick={(event) => addToLikedSongs(event, song._id)}>
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
                                </div>}

                            </div>
                        </>
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

export default ArtistDetails;
