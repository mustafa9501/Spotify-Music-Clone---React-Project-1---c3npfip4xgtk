import { Icon } from "@iconify/react";
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <div className="flex flex-col md:flex-row justify-between md:space-x-8 ml-6 mt-10">
        <div className="flex flex-col mb-4 md:mb-0 md:w-1/4">
          <div className="text-white font-bold">Company</div>
          <div className="text-zinc-400 text-sm font-medium hover:text-white mt-3 hover:underline cursor-not-allowed">About</div>
          <div className="text-zinc-400 text-sm font-medium cursor-not-allowed hover:text-white mt-1.5 hover:underline">Jobs</div>
          <div className="text-zinc-400 text-sm font-medium cursor-not-allowed hover:text-white mt-1.5 hover:underline">For the Record</div>
        </div>
        <div className="flex flex-col mb-4 md:mb-0 md:w-1/4">
          <div className="text-white font-bold">Communities</div>
          <div className="text-zinc-400 text-sm font-medium cursor-not-allowed hover:underline hover:text-white mt-3">For Artists</div>
          <div className="text-zinc-400 text-sm font-medium cursor-not-allowed hover:underline hover:text-white mt-1.5">Developers</div>
          <div className="text-zinc-400 text-sm font-medium cursor-not-allowed hover:underline hover:text-white mt-1.5">Advertising</div>
          <div className="text-zinc-400 text-sm font-medium cursor-not-allowed hover:underline hover:text-white mt-1.5">Investors</div>
          <div className="text-zinc-400 text-sm font-medium cursor-not-allowed hover:underline hover:text-white mt-1.5">Vendors</div>
        </div>
        <div className="flex flex-col mb-4 md:mb-0 md:w-1/4">
          <div className="text-white font-bold">Useful links</div>
          <div className="text-zinc-400 text-sm font-medium cursor-not-allowed hover:underline hover:text-white mt-3">Support</div>
          <div className="text-zinc-400 text-sm font-medium cursor-not-allowed hover:underline hover:text-white mt-1.5">Free Mobile App</div>
        </div>
      </div>

      <div className="mt-8 border-b border-zinc-700"></div>

      <div className="flex justify-start mt-6 ml-6">
        <div className="flex gap-6 font-2xl">
          <Link to="https://www.instagram.com/spotify/"><Icon icon="ri:instagram-line" width="1.2rem" height="1.2rem" style={{ color: "white" }} className="bg-zinc-700 hover:bg-zinc-500 rounded-full h-10 w-10 p-2" /></Link>
          <Link to="https://twitter.com/spotify"><Icon icon="ri:twitter-fill" width="1.2rem" height="1.2rem" style={{ color: 'white' }} className="bg-zinc-700 hover:bg-zinc-500 rounded-full h-10 w-10 p-2" /></Link>
          <Link to="https://www.facebook.com/Spotify"><Icon icon="ic:round-facebook" width="1.2rem" height="1.2rem" style={{ color: 'white' }} className="bg-zinc-700 hover:bg-zinc-500 rounded-full h-10 w-10 p-2" /></Link>
        </div>
      </div>

      <div className="mt-6 mb-8 text-zinc-400 ml-6 font-medium text-sm">© 2024 Spotify AB</div>
    </>
  );
};

export default Footer;




// xl:w-2/4 lg:2/4 md:2/4 xl:block lg:block md:block