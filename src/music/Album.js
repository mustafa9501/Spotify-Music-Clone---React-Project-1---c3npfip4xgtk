// import React from 'react'
// import { useUser } from '../Routes/UserProvider';;
// import { Icon } from '@iconify/react';
// import AudioPlayer from '../music/AudioPlayer';
// import Aside from '../Routes/Aside';;
// import NavButton from '../InputComponent/shared/NavButton';
// import { Link } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
// import Footer from '../Routes/Footer';import IconText from '../InputComponent/shared/IconText';
// ;

// const Album = () => {
//     const { getUser, signOutUser, setArtistData } = useUser();

//     const onChangeHandler = () => {
//         localStorage.removeItem("token");
//         signOutUser();
//       };

//       const navigate = useNavigate();

//   return (
//     <>
//         <div className="w-screen h-full block">
//           <div className="flex h-9/10 w-screen">
//                     <div className="w-1/5 h-10/12">
//                     {/* This is left side component */}
//                     <Aside />
//                     </div>
//                 {/* This is right side component */}
//              <div className="w-4/5 h-full bg-black mb-3">
//                 {/* navbar */}
//                 <div className="bg-neutral-900  mt-2 bg-opacity-70 flex justify-between items-center rounded-t-lg">             
//                <div className="text-white flex items-center">
//                 <div className='backbutton flex ml-6 gap-2'>
//                       <Icon icon="material-symbols:arrow-back-ios-new" width="1.5rem" height="1.5rem"  style={{color: '#a19b9b'}} className='rounded-full bg-black cursor-pointer'
//                       onClick={()=>{navigate(-1)}}/>
//                       <Icon icon="material-symbols:arrow-forward-ios" width="1.5rem" height="1.5rem"  style={{color: '#a19b9b'}} className='rounded-full bg-black cursor-pointer text-zinc-700'
//                       onClick={()=>{navigate(+1)}}/>
//                 </div>
//                 <input
//                   className="rounded-full border-2 p-3.5 w-96 ml-4 gap-10 pl-12 text-sm  font-semibold placeholder-neutral-600 hover:bg-neutral-700 bg-neutral-800"
//                   type="text"
//                   placeholder="What do you want to listen to?"
//                 />
//                 <div className="absolute ml-24 mb-2 font-sm">
//                   <IconText
//                     iconName={"mingcute:search-line"}
//                     style={{ color: "red" }}
//                   />
//                 </div>
//               </div>
//               <div className="flex justify-end items-center">
//                 {!getUser && (
//                   <>
//                     <Link to="/premium">
//                       <NavButton displayText={"Premium"} />
//                     </Link>
//                     <Link to="/support">
//                       <NavButton displayText={"Support"} />
//                     </Link>
//                     <Link to="/download">
//                       {" "}
//                       <NavButton displayText={"Download"} />
//                     </Link>
//                   </>
//                 )}
//                 {getUser &&
//                   getUser.status === "success" && (
//                     <NavButton displayText={""} />
//                   ) && <NavButton displayText={""} /> && (
//                     <Link to="/premium">
//                       <div className="rounded-full bg-white px-4 pr-3.5 py-1.5 text-black hover:scale-105 font-semibold text-sm mr-2">
//                         Explore Premium
//                       </div>
//                     </Link>
//                   )}

//                 <div className="h-8 border-r-2 border-zinc-600 ml-4"></div>
//                 {!getUser && (
//                   <>
//                     <Link to="/signup">
//                       <NavButton displayText={"Sign up"} />
//                     </Link>
//                     <div className="bg-white px-8 py-3 my-3 flex items-center  justify-center rounded-full ml-4 mr-8 font-semibold cursor-pointer hover:scale-105 hover:bg-green-400 text-neutral-900">
//                       <Link to="/login">Log in</Link>
//                     </div>
//                   </>
//                 )}
//                 {getUser && getUser.status === "success" && (
//                   <Link to="/" onClick={onChangeHandler}>
//                     <div className="text-zinc-400 px-5 py-3 my-3 taxt-base flex items-center justify-center ml-4 mr-8 font-semibold cursor-pointer hover:scale-105 hover:text-white">
//                       Logout
//                     </div>
//                   </Link>
//                 )}
//               </div>
//                 </div> 
//                      {/* body part */}
//                     <div className='h-9/10 overflow-y-auto rounded-b-lg'>
                        

//                             {/* footer */}
//                             <div className="mt-12">
//                                 <Footer />
//                             </div>
//                     </div> 
//                     </div>
//               </div>
//                         {/* Audio player */}
//                     <div className="w-screen h-24 p-4 bg-black">
//                         <AudioPlayer />
//                     </div>
//         </div>                
//     </>
//   )
// }

// export default Album
