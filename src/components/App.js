import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Login from "../Routes/Login";
import Signup from "../Routes/Signup";
import Home from "../Routes/Home";
import axios from "axios";
import { useUser } from "../Routes/UserProvider";
import Search from "../Routes/Search";
import Premium from "../Routes/Premium";
import Support from "../Routes/Support";
import Download from "../Routes/Download";
import LikedSongs from "../Routes/LikedSongs";
import ArtistDetails from "../Routes/ArtistDetails";
import AlbumSongs from "../music/AlbumSongs";
import Aside from "../Routes/Aside";
import Nav from "../Routes/Nav";
import AudioPlayer from "../music/AudioPlayer";
import Songs from "../music/Songs";
import ComingSoon from "../Routes/ComingSoon";
import UpdatePassword from "../Routes/UpdatePassword";

// function ProtectedRoute({ children }) {
//   const { getUser } = useUser();
//   if (getUser && getUser.status === 'success') {
//     return children;
//   } else {
//     return <Navigator to={'/login'} />;
//   }
// }

function App() {
  return (
    <div className="h-screen w-full font-poppins bg-black">
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </div>
  );
}

function AppContent() {
  const location = useLocation();
  const isCallingRoute = location.pathname === "/premium" || location.pathname === "/support" ||
  location.pathname === "/download" ||location.pathname === "/login" ||
  location.pathname === "/signup" || location.pathname === "/updatepassword";

  axios.interceptors.request.use(async (config) => {
    config.headers["projectid"] = "f104bi07c490";
    return config;
  });

  return (
    <div className="w-screen h-full block">
      <div className="flex h-9/10 w-screen">
        {isCallingRoute ? null : (
          <div className="w-1/5 h-10/12">
            <Aside />
          </div>
        )}
        <div className="w-4/5 h-full bg-black mb-3">
          {!isCallingRoute && <Nav />}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/login" element={<div className="h-screen w-screen"><Login /></div>} />
            <Route path="/signup" element={<div className="h-screen w-screen"><Signup /></div>} />
            <Route path="/premium" element={<div className="h-screen w-screen"><Premium /></div>}/>
            <Route path="/support" element={<div className="h-screen w-screen"><Support /></div>} />
            <Route path="/download" element={<div className="h-screen w-screen"><Download /></div>} />
            <Route path="/likedsongs" element={<LikedSongs />} />
            <Route path="/artist/:id" element={<ArtistDetails />} />
            <Route path="/album/:id" element={<AlbumSongs />} />
            <Route path="/search/songs" element={<Songs />} />
            <Route path="/comingsoon" element={<ComingSoon />} />            
            <Route path="/updatepassword" element={<div className="h-screen w-screen"><UpdatePassword /></div>} />            
          </Routes>
        </div>
      </div>
      <div className="w-screen h-24 p-4 bg-black">
        {isCallingRoute ? null : <AudioPlayer />}
      </div>
    </div>
  );
}

export default App;
