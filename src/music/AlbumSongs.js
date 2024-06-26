import React, {useState, useEffect} from "react";
import axios from "axios";
import { useUser } from "../Routes/UserProvider";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import Footer from "../Routes/Footer";
import { toast } from "react-toastify";

const AlbumSongs = () => {
  const { getUser, albumData, setCurrentPlaying, artistData } = useUser();
  console.log(albumData);
  const [likedSongs, setLikedSongs] = useState([]);
  console.log(artistData)


  const navigate = useNavigate();

  useEffect(() => {
    const storedLikedSongs = JSON.parse(localStorage.getItem('likedSongs')) || [];
    setLikedSongs(storedLikedSongs);
  }, []);

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

  return (
    <>
      {/* body part */}
      <div className="lg:md:h-9/10 h-9/11 overflow-y-auto rounded-b-lg bg-neutral-900">
        {/* header */}
        <div className='lg:hidden fixed w-full bg-[#383838] text-white pl-4'>
          <Icon icon="mingcute:arrow-left-fill" width="3rem" height="3rem" style={{ color: 'white' }} onClick={() => {
            navigate(-1);
          }} />
        </div>

        <div className="w-full h-100 bg-[#383838] p-10">
          <div className="lg:flex block">
            <img
              className="mr-6 lg:md:h-72 lg:md:w-72 h-52 w-52 lg:mt-0 mt-2 rounded-full"
              src={albumData.image}
              alt="image"
            />
            <div className="flex flex-col justify-center">
              {/* content */}
              <h1 className="lg:mt-0 mt-2 mb-2 text-white lg:md:text-6xl text-4xl font-bold ">
                {albumData.title}
              </h1>
              <p className="text-gray-400 text-sm">Created by Mustafa Zaheer</p>
            </div>
          </div>
        </div>

        {/* button playlist */}
        <div className="bg-[#121212]">
          <div className="flex justify-start">
            {/* <div className="flex"> */}
            <div className="mr-2 px-8 my-6">
              <Icon
                icon="icon-park-solid:play"
                style={{ color: "#1ED760" }}
                className="h-16 w-16 hover:scale-105"
              />
            </div>

            <button className="mr-2 border border-slate-500 block  rounded-full ml-2 px-4 py-1 my-10 hover:scale-105 hover:border-white text-white font-semibold">
              Follow
            </button>
          </div>

          {/* Main song list */}
          <div className="Songs ">
            {/* song list header */}
            <div className="border-b text-zinc-400 border-gray-800 lg:ml-16 ml-10 mr-2 text-sm flex justify-between">
              <div className="flex gap-7">
                <div class="p-2 w-full">#</div>
                <div class="p-2 w-full">Title</div>
              </div>
              {/* <div class="pt-2 pl-28 w-full text-right">Artist</div> */}
              <div class="p-2 w-full text-right lg:mr-10 mr-8">Favorite</div>
            </div>
            <div className="lg:pl-16 pl-10 pt-4">
              {albumData.songs && albumData.songs.map((song, index) => (
                <div
                  key={song._id}
                  className="flex border-b text-zinc-400 border-gray-800 hover:bg-zinc-800 group hover:text-white"
                >
                  <span className="p-3 w-8 mt-2 flex-shrink-0">
                    {index + 1}
                  </span>
                  <Icon
                    icon="entypo:controller-play"
                    width="2rem"
                    height="2rem"
                    style={{ color: "#72d95e" }}
                    className="transform opacity-0 group-hover:opacity-100 mr-2 mt-3"
                  />
                  <img
                    src={song.thumbnail}
                    className="w-16 h-12 mt-1 rounded-md"
                    alt={song.title}
                    onClick={() => {
                      handlePlaySortedSong(song);
                    }}
                  />
                  <div
                    className="p-3 mt-1 w-full"
                    onClick={() => {
                      handlePlaySortedSong(song);
                    }}
                  >
                    {song.title}
                  </div>

                  {getUser && getUser.status == "success" && (
                    <div
                      className="heart"
                      onClick={(event) => addToLikedSongs(event, song._id)}
                    >
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
            {/* Add more song entries as needed */}
          </div>
        </div>
        {/* footer */}
        <div className="mt-12">
          <Footer />
        </div>
      </div>

    </>
  );
};

export default AlbumSongs;
