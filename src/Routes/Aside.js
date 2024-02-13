import React from "react";
import IconText from "../InputComponent/shared/IconText";
import spotify_logo from "../assets/images/spotify_logo_white.svg";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { useUser } from './UserProvider';

const Aside = () => {

  const { getUser } = useUser();
//   const location = useLocation();
//  console.log(location)
  return (<>
    {/* <div className="bg-black h-full w-1/5"> */}
        {/* This div is for top side component */}
        <div className="bg-neutral-900 rounded-lg w-64 h-1/4 p-2 m-2">
          {/* This div is for logo */}
          <div className="pt-2 cursor-pointer pb-0 pl-3.5">
            <img src={spotify_logo} alt="spotify logo" width={80} />
          </div>
          <div className="text-zinc-400 cursor-pointer hover:text-white">
            <Link to="/">
              <IconText
                iconName={"material-symbols:home"}
                displayText={"Home"}
              />
            </Link>
          </div>
          <div className="text-zinc-400 cursor-pointer hover:text-white">
            <Link to="/search">
              <IconText
                iconName={"mingcute:search-line"}
                displayText={"Search"}
                //   active
              />
            </Link>
          </div>
        </div>

        {/* This div for botton side component */}
        <div className="bg-neutral-900 boder rounded-lg w-64 h-7/10 p-3 m-2 ">
          <div className="flex justify-between ">
            <div className="text-zinc-400 hover:text-white">
              <Link to="/comingsoon"><IconText iconName={"ion:library"} displayText={"Your Library"} /></Link>
            </div>
            <div className="text-zinc-500 cursor-pointer text-3xl mt-2.5 hover:text-white">
              +
            </div>
          </div>
          {getUser && getUser.status == "success" && <div className="text-zinc-400 hover:text-white">
            <Link to='/likedsongs'><IconText iconName={"mdi:heart"} displayText={"Liked Songs"} /></Link> 
          </div>}
          <div className="flex justify-between text-xs text-zinc-400 mt-20 cursor-pointer pl-2.5 font-medium">
            <h5>Legal</h5>
            <h5>Privacy Center</h5>
            <h5>Privacy Policy</h5>
          </div>
          <div className="flex justify-between text-xs text-zinc-400 mt-5 cursor-pointer pl-2.5 font-medium">
            <h5>Cookies</h5>
            <h5>About Ads</h5>
            <h5>Accessibility</h5>
          </div>
          <div className="flex text-xs text-zinc-400 mt-5 cursor-pointer pl-2.5 font-medium">
            <h5>Cookies</h5>
          </div>
           <Link to="/comingsoon"><div className="py-4 p-2.5">
            <div className="mt-10 border rounded-full border-gray-700 text-white font-semibold flex w-2/4 justify-center items-center hover:border-white hover:scale-105 cursor-pointer">
              <Icon icon="lucide:globe" />
              <div className="p-1">English</div>
            </div>        
          </div></Link>
        </div>
    </>
  );
};

export default Aside;
