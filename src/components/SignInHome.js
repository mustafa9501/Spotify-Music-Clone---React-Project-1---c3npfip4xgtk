import React from "react";
import Cards from "../commonCards/Cards";
import { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Nav from "../Routes/Nav";
import Footer from "../Routes/Footer";
import Aside from "../Routes/Aside";

const SignInHome = () => {

  const [album, setAlbum] = useState([]);
  const [list, setList] = useState([]);
  
  const SportifyPlaylists = async () => {
    axios
      .get("https://academics.newtonschool.co/api/v1/music/album")
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

  const TrendingSongs = async () => {
    axios
      .get("https://academics.newtonschool.co/api/v1/music/song")
      .then((response) => {
        console.log(response.data.data);
        setList(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    TrendingSongs();
  }, []);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 3,
  };

  return (
    <>
      {/* This is left side component */}
      <Aside />
      {/* This is right side component */}
      <div className="h-full w-4/5 bg-black mb-2"style={{ marginLeft: '17rem' }}>

        {/* This is nav div */}
        <Nav />

        {/* This is content div */}
        <div className="bg-neutral-900 w-full rounded-b-lg p-4">
          <div className="text-white font-bold text-xl ml-20 ">
            Spotify Playlists
          </div>
          <Slider {...settings} className="px-8 ml-8 mr-8 ">
            {album.map((obj, index) => {
              return (
                <div key={index}>
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
          <div className="text-white font-bold text-xl ml-20 ">
            Trending Songs
          </div>
          <Slider {...settings} className="px-8 ml-8 mr-8 ">
            {list.map((obj, index) => {
              return (
                <div key={index}>
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
          <div><Footer /></div>
        </div>
      </div>
    </>
  );
};

export default SignInHome;
