import React from "react";
import Cards from "../commonCards/Cards";
import { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Nav from "./Nav";
import Footer from "./Footer";
import Aside from "./Aside";
import AudioPlayer from "../music/AudioPlayer";
import { useUser } from "./UserProvider";

const Home = () => {

  const {setCurrentPlaying} = useUser();
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
    dots: false,
    infinite: false,
    speed: 500,   
    slidesToShow: 4,
    slidesToScroll: 3,
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
          slidesToShow: 2,
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
    {/* <div className="w-screen h-full block "> */}
       {/* <div className="flex h-9/10 w-screen"> */}
         {/* This is left side component */}
          {/* <div className="w-1/5 h-10/12">
            {/* <Aside/> */}
          {/* </div> */} 
            {/* This is right side component */}
           {/* <div className="w-4/5 h-full bg-black mb-3"> */}

                {/* This is nav div */}
                {/* <Nav /> */}

              {/* This is content div */}
              <div className="bg-neutral-900 h-9/10 overflow-y-auto rounded-b-lg">  
                  <div className="text-white font-bold text-xl ml-20 mt-4">
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
                          <div key={index} onClick= {()=>{handlePlaySortedSong(obj)}}>
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
                    <div className="mt-16"><Footer /></div>
              </div>    
            {/* </div> */}
       {/* </div> */}
       {/* <div className="w-screen h-24 p-4 bg-black"> <AudioPlayer/></div>  */}
                    
    {/* </div> */}
</>
  );
};

export default Home;
