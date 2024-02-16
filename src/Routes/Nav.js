import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NavButton from "../InputComponent/shared/NavButton";
import { useUser } from "./UserProvider";
import { Icon } from "@iconify/react";
import IconText from "../InputComponent/shared/IconText";
import spotify_logo from "../assets/images/spotify_logo_white.svg";

const Nav = () => {
  const location = useLocation();
  const { getUser, signOutUser, list, setList } = useUser();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const onChangeHandler = () => {
    localStorage.removeItem("token");
    signOutUser();
  };
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  const onSearchDetails = () => {
    // const queryString = { title: event.target.value, };
    axios
      .get(
        `https://academics.newtonschool.co/api/v1/music/album?search={"title":"${searchTerm}"}`
      )
      .then((response) => {
        setList(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    onSearchDetails();
  }, [searchTerm]);

 
  const [isScreenSmall, setIsScreenSmall] = useState(window.innerWidth < 1100);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsScreenSmall(window.innerWidth < 1100);
    };

    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {isSidebarOpen && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
            <div className="bg-black w-full h-full pl-6 pt-16 font-bold text-white">
              <button
                className="absolute top-2 right-2"
                onClick={toggleSidebar}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 font-bold text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              <ul className="p-5">
              {!getUser && ( <>
                <Link to="/login"><li className="text-3xl">Login</li></Link>
                <Link to="/signup"><li className="text-3xl pt-8">Sign up</li></Link>
                </> )}
                {getUser && getUser.status === "success" && ( <>
                <Link to="/updatepassword">
                      <div
                        className="text-white text-2xl">
                        Update Password
                      </div>
                    </Link>
                    <Link to="/" onClick={onChangeHandler}>
                      <div
                        className="text-white text-2xl pt-8">
                        Logout
                      </div>
                    </Link>
                      </> )}

                <li className="text-3xl pt-8">--</li>
                <Link to="/premium"><li className="text-xl pt-8">Premium</li></Link>
                <Link to="/"><li className="text-xl pt-4">Help</li></Link>
                <Link to="/download"><li className="text-xl pt-4">Download</li></Link>
                <Link to="/support"><li className="text-xl pt-4">Support</li></Link>                
              </ul>
            </div>
          </div>
        </>
      )}

      {isScreenSmall ? (
        <div className="flex justify-between pr-3">
         <div className="flex justify-start">
          <div className="flex text-white p-3">
          <Link to='/'><img src={spotify_logo} alt="spotify logo" width={110} /></Link>
          </div>

          {location.pathname === "/search" && (
              <div className="flex justify-start group mr-2">
                <input
                  className="rounded-full border-2 mt-1.5 mb-1.5 p-2 w-96 pl-12 text-sm font-semibold placeholder-neutral-600 hover:bg-neutral-700 bg-neutral-800 text-white"
                  type="text"
                  placeholder="What do you want to listen to?"
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="absolute mb-2 font-sm text-zinc-400 group-hover:text-white">
                  <IconText iconName={"mingcute:search-line"} />
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-center items-center gap-3">
          {!getUser && ( <>
            {/* <div className="text-white" >
              <Link to="/search"><Icon icon="iconamoon:search-fill" width="1.5rem" height="1.5rem"  style={{color: 'white'}} /></Link>
            </div> */}
            <Link to='/comingsoon'><div className="text-black bg-white rounded-2xl p-1 text-sm">
              Open App
            </div></Link>
            </>)}
            <div className="text-white">
              <Icon icon="octicon:three-bars-16" onClick={toggleSidebar} 
              className="h-7 w-7 mr-1"/>
            </div>
          </div>  
        </div>
        
      ) : (
        // for large device code here
        <div className="navbar w-full h-18 bg-neutral-900 rounded-t-lg mt-2 mr-2 bg-opacity-70 flex justify-between items-center">
          <div className="flex justify-start items-center gap-5">
            <div className="backbutton flex ml-6 gap-2">
              <Icon
                icon="material-symbols:arrow-back-ios-new"
                width="1.5rem"
                height="1.5rem"
                style={{ color: "#a19b9b" }}
                className="rounded-full bg-black cursor-pointer"
                onClick={() => {
                  navigate(-1);
                }}
              />
              <Icon
                icon="material-symbols:arrow-forward-ios"
                width="1.5rem"
                height="1.5rem"
                style={{ color: "#a19b9b" }}
                className="rounded-full bg-black cursor-pointer text-zinc-700 "
                onClick={() => {
                  navigate(+1);
                }}
              />
            </div>
            {/* search input */}

            {location.pathname === "/search" && (
              <div className="flex justify-start  group">
                <input
                  className="rounded-full border-2 p-3.5 lg:w-96 w-80 pl-12 text-sm  font-semibold placeholder-neutral-600 hover:bg-neutral-700 bg-neutral-800 text-white"
                  type="text"
                  placeholder="What do you want to listen to?"
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="absolute mb-2 font-sm text-zinc-400 group-hover:text-white">
                  <IconText iconName={"mingcute:search-line"} />
                </div>
              </div>
            )}
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
                  <div className="rounded-full bg-white px-4 pr-3.5 py-1.5 text-black hover:scale-105 font-semibold text-sm mr-5">
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
                <Link to="/login">
                  <div className="bg-white px-8 py-3 my-3 taxt-base flex items-center justify-center rounded-full ml-4 mr-8 font-semibold cursor-pointer hover:scale-105 hover:bg-green-400">
                    Log in
                  </div>
                </Link>
              </>
            )}

            {getUser && getUser.status === "success" && (
              <div className="profile-dropdown relative ml-4 mr-8">
                <div>
                  <button
                    type="button"
                    className="relative flex justify-center items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 h-8 w-8 m-5"
                    id="user-menu-button"
                    aria-expanded="false"
                    aria-haspopup="true"
                    onClick={() => setDropdownOpen(!dropdownOpen)}>
                    <Icon
                      icon="carbon:user-filled"
                      width="1.5rem"
                      height="1.5rem"
                      style={{ color: "#e3e3e3" }}
                    />
                  </button>
                </div>
                {dropdownOpen && (
                  <div
                    className="absolute right-0 z-10 mt-2 w-44 origin-top-right rounded-md bg-zinc-800 text-zinc-200 font-semibold py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu-button"
                    tabIndex="-1"
                  >
                    {/* Dropdown items */}
                    <Link to="/">
                      <div
                        className="block px-4 py-2 text-sm hover:bg-zinc-600"
                        role="menuitem"
                        tabIndex="-1"
                        id="user-menu-item-0"
                      >
                        Your Profile
                      </div>
                    </Link>
                    <Link to="/updatepassword">
                      <div
                        className="block px-4 py-2 text-sm hover:bg-zinc-600"
                        role="menuitem"
                        tabIndex="-1"
                        id="user-menu-item-2"
                      >
                        Update Password
                      </div>
                    </Link>
                    <Link to="/" onClick={onChangeHandler}>
                      <div
                        className="block px-4 py-2 text-sm hover:bg-zinc-600"
                        role="menuitem"
                        tabIndex="-1"
                        id="user-menu-item-1"
                      >
                        Logout
                      </div>
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Nav;

{
  /* {getUser && getUser.status === 'success' &&<Link to="/" onClick={onChangeHandler}><NavButton displayText={"Logout"}></NavButton></Link>} */
}
