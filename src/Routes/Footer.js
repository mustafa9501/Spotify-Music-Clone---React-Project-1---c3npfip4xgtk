import { Icon } from "@iconify/react";
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return ( <>
    <div className="flex justify-between">
      <div className="flex gap-28 ml-10 mt-10">
        <div className="flex-col ">       
            <div className="text-white font-bold ">Company</div>
            <div className="text-zinc-400 text-sm font-medium cursor-pointer hover:text-white mt-1.5 hover:underline">About</div>
            <div className="text-zinc-400 text-sm font-medium cursor-pointer hover:text-white mt-1.5 hover:underline">Jobs</div>
            <div className="text-zinc-400 text-sm font-medium cursor-pointer  hover:text-white mt-1.5 hover:underline">For the Record</div>
        </div>
        <div className="block">
            <div className="text-white font-bold">Communities</div>
            <div className="text-zinc-400 text-sm font-medium cursor-pointer hover:underline hover:text-white mt-1.5">For Artists</div>
            <div className="text-zinc-400 text-sm font-medium cursor-pointer hover:underline hover:text-white mt-1.5">Developers</div>
            <div className="text-zinc-400 text-sm font-medium cursor-pointer hover:underline hover:text-white mt-1.5">Advertising</div>
            <div className="text-zinc-400 text-sm font-medium cursor-pointer hover:underline hover:text-white mt-1.5">Investors</div>
            <div className="text-zinc-400 text-sm font-medium cursor-pointer hover:underline hover:text-white mt-1.5">Vendors
            </div>
        </div>
        <div className="block">
            <div className="text-white font-bold">Useful links</div>
            <div className="text-zinc-400 text-sm font-medium cursor-pointer hover:underline hover:text-white mt-1.5">Support</div>
            <div className="text-zinc-400 text-sm font-medium cursor-pointer hover:underline hover:text-white mt-1.5">Free Mobile App</div> 
        </div>
      </div>
        <div className="flex gap-6 mr-10 font-2xl mt-10">
           <Link to="https://www.instagram.com/spotify/"><Icon icon="ri:instagram-line" width="1.2rem" height="1.2rem"  style={{color: "white"}} className="bg-zinc-700 hover:bg-zinc-500 rounded-full h-10 w-10 p-2"/>
            </Link> 
            <Link to="https://twitter.com/spotify"><Icon icon="ri:twitter-fill" width="1.2rem" height="1.2rem"  style={{color: 'white'}} className="bg-zinc-700 hover:bg-zinc-500 rounded-full h-10 w-10 p-2"/>
            </Link> 
            <Link to="https://www.facebook.com/Spotify"><Icon icon="ic:round-facebook" width="1.2rem" height="1.2rem"  style={{color: 'white'}} className="bg-zinc-700 hover:bg-zinc-500 rounded-full h-10 w-10 p-2"/>
            </Link> 
        </div>
    </div>
    <div className="mt-10 ml-8 mr-8 border-b border-zinc-700"></div>
    <div className="mt-8 mb-12 text-zinc-400 ml-8 font-medium text-sm">© 2024 Spotify AB</div>
  </>
  );
};

export default Footer;
