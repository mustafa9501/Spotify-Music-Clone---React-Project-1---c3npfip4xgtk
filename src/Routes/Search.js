import React, { useEffect, useState } from "react";
import NavButton from "../InputComponent/shared/NavButton";
import { Link } from "react-router-dom";
import IconText from "../InputComponent/shared/IconText";
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
  // const [album, setAlbum] = useState([]);
  // const [list, setList] = useState([]);
  const { getUser, signOutUser, setArtistData, setAlbumData, list, setList } = useUser();

  const onChangeHandler = () => {
    localStorage.removeItem("token");
    signOutUser();
  };
  const navigate = useNavigate();

  const onClickAlbums = async () => {
    axios.get("https://academics.newtonschool.co/api/v1/music/album?limit=100")
      .then((response) => { setList(response.data.data); })
      .catch((error) => { console.log(error); });
  };

  const[newData,setNewData]=useState([]);

  const onClickAll = async () => {
    axios.get("https://academics.newtonschool.co/api/v1/music/album?limit=100")
      .then((response) => { setList(response.data.data); })
      .catch((error) => { console.log(error); });

    axios.get("https://academics.newtonschool.co/api/v1/music/song?limit=100")
      .then((response) => { setNewData(response.data.data); })
      .catch((error) => { console.log(error); });
  };

  const onArtistClick = async () => {
    axios.get("https://academics.newtonschool.co/api/v1/music/artist?limit=100")
      .then((response) => { console.log(response.data.data); setList(response.data.data); })
      .catch((error) => { console.log(error); });
  };

  const handleItemClick = async (id) => {
    if(selectedTab==="All"){
      handleAlbumClick(id);  
    }
    if (selectedTab === 'Albums') {
      handleAlbumClick(id);
    } else if (selectedTab === 'Artists') {
      handleArtistClick(id);
    }
  };

  const [selectedTab, setSelectedTab] = useState('All');

  const handleTabClick = (tabName) => {
    setSelectedTab(tabName);
  };

  const handleAlbumClick = async (albumId) => {
    axios.get(`https://academics.newtonschool.co/api/v1/music/album/${albumId}`)
      .then((response) => { console.log(response.data.data); setAlbumData(response.data.data); navigate(`/album/${albumId}`) })
      .catch((error) => { console.log(error); });
  };

  const handleArtistClick = async (artistId) => {
    axios.get(`https://academics.newtonschool.co/api/v1/music/artist/${artistId}`)
      .then((response) => { console.log(response.data.data); setArtistData(response.data.data); navigate(`/artist/${artistId}`) })
      .catch((error) => { console.log(error); });
  };

  useEffect(()=>{
    onClickAll();
  },[])

  return (
    <>
   <div className="bg-neutral-900 lg:md:h-9/10 h-10/10 overflow-y-auto rounded-b-lg">
   <div className="flex gap-4 ml-10">

    <div className="text-white text-sm lg:ml-8 ml-0 mt-4 py-1.5 lg:px-3 px-2 rounded-3xl bg-zinc-800 hover:bg-zinc-700 cursor-pointer" onClick={() => { handleTabClick('All'); onClickAll() }}>All</div>

    <Link to="/search/songs"><div className="text-white text-sm mt-4 rounded-3xl py-1.5  px-5 bg-zinc-800 hover:bg-zinc-700 cursor-pointer">Songs</div></Link>

    <div className="text-white text-sm mt-4  rounded-3xl py-1.5 px-4 bg-zinc-800 hover:bg-zinc-700 cursor-pointer" onClick={() => { handleTabClick('Artists'); onArtistClick(); }}>Artists</div>

    <div className="text-white text-sm mt-4  rounded-3xl py-1.5 px-3.5 bg-zinc-800 hover:bg-zinc-700 cursor-pointer" onClick={() => { handleTabClick('Albums'); onClickAlbums(); }}>Albums</div>
  </div>

  {selectedTab === "All" && <h2 className="text-white text-xl font-semibold lg:ml-24 ml-10 mt-8">Albums</h2>}
  <div className="flex flex-wrap lg:gap-6 gap-0 lg:justify-center justify-start">
    {list.map((obj, index) => {
      return (
        <div key={index} onClick={() => handleItemClick(obj._id)}>
          <Cards src={obj?.thumbnail || obj?.image} alt={obj.title} title={obj?.title || obj?.name} />
        </div>
      );
    })}
  </div>
  <div className="lg:mt-12 mt-0">
    <Footer />
  </div>
</div>

    </>
  );
};

export default Search;
