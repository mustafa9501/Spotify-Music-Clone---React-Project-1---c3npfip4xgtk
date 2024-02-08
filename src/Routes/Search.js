import React, { useEffect, useState } from "react";
import NavButton from "../InputComponent/shared/NavButton";
import { Link } from "react-router-dom";
import IconText from "../InputComponent/shared/IconText";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Cards from "../commonCards/Cards";
import axios from "axios";
import Footer from "./Footer";
import Aside from "./Aside";
import { useUser } from "./UserProvider";
import AudioPlayer from "../music/AudioPlayer";
import { useNavigate } from 'react-router-dom';
import { Icon } from "@iconify/react";

const Search = () => {
  const [album, setAlbum] = useState([]);
  const [list, setList] = useState([]);
  const { getUser, signOutUser } = useUser();
  const [artist, setArtist] = useState([]);
  const [songs, setSongs] = useState([]);
  const [selectedArtist, setSelectedArtist] = useState(false);

  const onChangeHandler = () => {
    localStorage.removeItem("token");
    signOutUser();
  };

  const navigate = useNavigate();

  const onSearchDetails = (event) => {
    const queryString = {
      title: event.target.value,
    };
    axios
      .get("https://academics.newtonschool.co/api/v1/music/album/", {
        params: {
          search: JSON.stringify(queryString),
        },
      })
      .then((response) => {
        setList(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onClickSongs = async () => {
    axios
      .get("https://academics.newtonschool.co/api/v1/music/song?limit=100")
      .then((response) => {
        console.log("song", response.data.data);
        setList(response.data.data);
        // setSelectedArtist("song")
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onClickAlbums = async () => {
    axios
      .get("https://academics.newtonschool.co/api/v1/music/album?limit=100")
      .then((response) => {
        // console.log(response.data.data);
        setList(response.data.data);
        // setSelectedArtist("album")
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onArtistClick = async () => {
    axios
      .get("https://academics.newtonschool.co/api/v1/music/artist?limit=4")
      .then((response) => {
        setList(response.data.data);
        // setSelectedArtist("artist")
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // const handleArtistClick = async (artistSongs) => {
  //   for await ( const _id of artistSongs){
  //     axios
  //     .get(`https://academics.newtonschool.co/api/v1/music/song/${_id}`)
  //     .then((response) => {
  //       setList(prev => [...prev, response.data.data]);
  //     })
  //     .catch((error) => {
  //       console.error(Error);
  //     });
  //   }
  // };

  return (
    <>
      <div className="w-screen h-full block">
        <div className="flex h-9/10 w-screen">
          <div className="w-1/5 h-10/12">
            {/* This is left side component */}
            <Aside />
          </div>
          {/* This is right side component */}
          <div className="w-4/5 h-full bg-black mb-3">
            <div className="bg-neutral-900  mt-2 bg-opacity-70 flex justify-between items-center rounded-t-lg">
              
            <div className="text-white flex items-center">
                <div className='backbutton flex ml-6 gap-2'>
                      <Icon icon="material-symbols:arrow-back-ios-new" width="1.5rem" height="1.5rem"  style={{color: '#a19b9b'}} className='rounded-full bg-black cursor-pointer'
                      onClick={()=>{navigate(-1)}}/>
                      <Icon icon="material-symbols:arrow-forward-ios" width="1.5rem" height="1.5rem"  style={{color: '#a19b9b'}} className='rounded-full bg-black cursor-pointer text-zinc-700'
                      onClick={()=>{navigate(+1)}}/>
                </div>
                <input
                  className="rounded-full border-2 p-3.5 w-96 ml-4 gap-10 pl-12 text-sm  font-semibold placeholder-neutral-600 hover:bg-neutral-700 bg-neutral-800"
                  type="text"
                  placeholder="What do you want to listen to?"
                  onChange={onSearchDetails}
                />
                <div className="absolute ml-24 mb-2 font-sm">
                  <IconText
                    iconName={"mingcute:search-line"}
                    style={{ color: "red" }}
                  />
                </div>
              </div>
              <div className="flex justify-end items-center">
                {!getUser && (
                  <>
                    <Link to="/premium">
                      <NavButton displayText={"Premium"} />
                    </Link>
                    <Link to="/support">
                      <NavButton displayText={"Support"} />
                    </Link>
                    <Link to="/download">
                      {" "}
                      <NavButton displayText={"Download"} />
                    </Link>
                  </>
                )}
                {getUser &&
                  getUser.status === "success" && (
                    <NavButton displayText={""} />
                  ) && <NavButton displayText={""} /> && (
                    <Link to="/premium">
                      <div className="rounded-full bg-white px-4 pr-3.5 py-1.5 text-black hover:scale-105 font-semibold text-sm mr-2">
                        Explore Premium
                      </div>
                    </Link>
                  )}

                <div className="h-8 border-r-2 border-zinc-600 ml-4"></div>
                {!getUser && (
                  <>
                    <Link to="/signup">
                      <NavButton displayText={"Sign up"} />
                    </Link>
                    <div className="bg-white px-8 py-3 my-3 flex items-center  justify-center rounded-full ml-4 mr-8 font-semibold cursor-pointer hover:scale-105 hover:bg-green-400 text-neutral-900">
                      <Link to="/login">Log in</Link>
                    </div>
                  </>
                )}
                {getUser && getUser.status === "success" && (
                  <Link to="/" onClick={onChangeHandler}>
                    <div className="text-zinc-400 px-5 py-3 my-3 taxt-base flex items-center justify-center ml-4 mr-8 font-semibold cursor-pointer hover:scale-105 hover:text-white">
                      Logout
                    </div>
                  </Link>
                )}
              </div>
            </div>
            {/* This is content div */}
            <div className="bg-neutral-900 h-9/10 overflow-y-auto rounded-b-lg">
              <div className="flex gap-4">
                <div className="text-white text-sm ml-16 mt-4 rounded-3xl py-1.5 w-11 px-3 bg-zinc-800 hover:bg-zinc-700 cursor-pointer">
                  All
                </div>

                <div
                  className="text-white text-sm mt-4 rounded-3xl py-1.5 w-20 px-5 bg-zinc-800 hover:bg-zinc-700 cursor-pointer"
                  onClick={() => {
                    onClickSongs();
                    // setArtist([]); // Clear other categories when clicking on Artists
                    // setAlbum([]);
                    // setSelectedArtist('songs');
                  }}
                >
                  Songs
                </div>

                <div
                  className="text-white text-sm mt-4 rounded-3xl py-1.5 w-20 px-4 bg-zinc-800 hover:bg-zinc-700 cursor-pointer"
                  onClick={() => {
                    onArtistClick();
                    // setList([]); // Clear other categories when clicking on Artists
                    // setAlbum([]);
                    // setSelectedArtist('artists');
                  }}
                >
                  Artists
                </div>

                <div
                  className="text-white text-sm mt-4 rounded-3xl py-1.5 w-20 px-3.5 bg-zinc-800 hover:bg-zinc-700 cursor-pointer"
                  onClick={() => {
                    onClickAlbums();
                    // setList([]); // Clear other categories when clicking on Albums
                    // setArtist([]);
                    // setSelectedArtist('albums');
                  }}
                >
                  Albums
                </div>
                {/* <div className="text-white text-sm mt-4 rounded-3xl py-1.5 w-24 px-3.5 bg-zinc-800 hover:bg-zinc-700 cursor-pointer">
                 Postcards
              </div> */}
              </div>
              <div className="flex flex-wrap justify-center gap-5">
                {/* {selectedArtist === "song" &&  */}
                {list.map((obj, index) => {
                  return (
                    <div key={index}>
                      <Cards
                        src={obj?.thumbnail || obj?.image}
                        alt={obj.title}
                        title={obj?.title || obj?.name}
                      />
                    </div>
                  );
                })}
              </div>

              {/* </div>
              <div className="flex flex-wrap justify-center gap-5" >
                {selectedArtist === "artist" && 
                artist.map((obj, index) => {
                  return (
                    <div key={index}  onClick={()=>{handleArtistClick(obj.songs)}}>
                      <Cards
                        src={obj.image}
                        alt={obj.title}
                        title={obj.name}
                      />
                    </div>
                  );
                })
                }
              </div>  */}

              {/* this id for artist songs */}
              {/* {selectedArtist && ( */}
              {/* <div>
                    <div className="song-list">
                      {songs?.map((obj) => (
                        <div key={obj._id}>
                          <p>{obj.title}</p>
                          <p>{obj.thumbnail}</p>
                        </div>
                      ))}
                    </div>
                  </div> */}

              {/* )}  */}

              <div className="mt-12">
                <Footer />
              </div>
            </div>
          </div>
        </div>
        <div className="w-screen h-24 p-4 bg-black">
          {" "}
          <AudioPlayer />
        </div>
      </div>
    </>
  );
};

export default Search;
