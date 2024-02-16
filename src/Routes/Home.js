import React from "react";
import Cards from "../commonCards/Cards";
import { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Footer from "./Footer";
import { useUser } from "./UserProvider";
import { useNavigate } from "react-router-dom";

const Home = () => {

  const { setCurrentPlaying, setAlbumData, setArtistData } = useUser();
  const [album, setAlbum] = useState([]);
  const [list, setList] = useState([]);
  const [artist, setArtist] =useState([]);
  const { getUser } = useUser();

  const navigate = useNavigate();

  const SportifyPlaylists = async () => {
    axios
      .get("https://academics.newtonschool.co/api/v1/music/album?limit=50")
      .then((response) => {
        console.log(response.data.data);
        setAlbum(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    SportifyPlaylists();
  }, []);

  const handleAlbumClick = async (albumId) => {
    axios.get(`https://academics.newtonschool.co/api/v1/music/album/${albumId}`)
      .then((response) => { console.log(response.data.data); setAlbumData(response.data.data); navigate(`/album/${albumId}`) })
      .catch((error) => { console.log(error); });
  };

  const onArtistClick = async () => {
    axios.get("https://academics.newtonschool.co/api/v1/music/artist?limit=50")
      .then((response) => { console.log(response.data.data); setArtist(response.data.data); })
      .catch((error) => { console.log(error); });
  };

  const handleArtistClick = async (artistId) => {
    axios.get(`https://academics.newtonschool.co/api/v1/music/artist/${artistId}`)
      .then((response) => { console.log(response.data.data); setArtistData(response.data.data); navigate(`/artist/${artistId}`) })
      .catch((error) => { console.log(error); });
  };

  const TrendingSongs = async () => {
    axios
      .get("https://academics.newtonschool.co/api/v1/music/song?limit=50")
      .then((response) => {
        console.log(response.data.data);
        setList(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    TrendingSongs(), onArtistClick();
  }, []);


  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 3,

        }
      },
      {
        breakpoint: 968,
        settings: {
          slidesToShow: 3,
          arrows: false,

        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          arrows: false,

        }
      }
    ]
  };

  const handlePlaySortedSong = (song) => {
    setCurrentPlaying(song);
  };

  return (
    <>
      {/* This is content div */}
      <div className="bg-neutral-900 lg:md:h-9/10 h-10/11 overflow-y-auto rounded-b-lg w-full">
        <div className="text-white font-bold text-xl lg:ml-20 ml-6 mt-4">
          Spotify Albums
        </div>

        <Slider {...settings} className="xl:px-8 lg:px-8 md:px-4 sm:px-0 xl:ml-8 lg:ml-8 md:ml-4 sm:ml-0 mr-8 ">
          {album.map((obj, index) => {
            return (
              <div key={index} onClick={()=>handleAlbumClick(obj._id)}>
                <Cards
                  src={obj.image}
                  alt={obj.title}
                  title={obj.title}
                  subtitle={obj.description}
                />
              </div>
            );
          })}
        </Slider>

        {getUser && getUser.status === "success" && (<>
          <div className="text-white font-bold text-xl lg:ml-20 ml-6">
            Artists 
          </div>
          <Slider {...settings} className="xl:px-8 lg:px-8 md:px-4 sm:px-0 xl:ml-8 lg:ml-8 md:ml-4 sm:ml-0 mr-8 ">
            {artist.map((obj, index) => {
              return (
                <div key={index} onClick={() => { handleArtistClick(obj._id) }}>
                  <Cards
                    src={obj.image}
                    alt={obj.name}
                    title={obj.name}
                  />
                </div>
              );
            })}
          </Slider>
        </>)}

        {getUser && getUser.status === "success" && (<>
          <div className="text-white font-bold text-xl lg:ml-20 ml-6 mt-4">
            Trending Songs
          </div>
          <Slider {...settings} className="xl:px-8 lg:px-8 md:px-4 sm:px-0 xl:ml-8 lg:ml-8 md:ml-4 sm:ml-0 mr-8">
            {list.map((obj, index) => {
              return (
                <div key={index} onClick={() => { handlePlaySortedSong(obj) }}>
                  <Cards
                    src={obj.thumbnail}
                    alt={obj.title}
                    title={obj.title}
                    subtitle={obj.artist[0].description}
                  />
                </div>
              );
            })}
          </Slider>
        </>)}

        <div className="mt-16"><Footer /></div>
      </div>
    </>
  );
};

export default Home;
