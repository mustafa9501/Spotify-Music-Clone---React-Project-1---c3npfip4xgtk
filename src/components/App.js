import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../Routes/Login";
import Signup from "../Routes/Signup";
import Home from "../Routes/Home";
import axios from "axios";
import { useUser } from "../Routes/UserProvider";
import Search from "../Routes/Search";
import Premium from "../Routes/Premium";
import Support from "../Routes/Support";
import Download from "../Routes/Download";
import Dummy from "./dummy";
import LikedSongs from "../Routes/LikedSongs";


function ProtectedRoute({children}){
  const {getUser} = useUser();
  if(getUser && getUser.status === 'success'){
    return children;
  }
  else{
    return <Navigator to={'/login'} />
  }
}

function App() {

  axios.interceptors.request.use(async(config)=>{
    config.headers["projectid"] = "f104bi07c490";
    return config;
  })

  // const path = window.location.pathname;
  // console.log(path)
  return (
    <div className="h-screen w-full font-poppins bg-black">

        <BrowserRouter>      
          <Routes>
              <Route path="/" element={<Home/>}></Route>
              <Route path="/search" element={<Search/>}></Route>
              <Route path="/login" element={<Login/>}></Route>
              <Route path="/signup" element={<Signup/>}></Route>
              <Route path="/premium" element={<Premium/>}></Route>
              <Route path="/support" element={<Support/>}></Route>
              <Route path="/download" element={<Download/>}></Route>
              <Route path="/likedsongs" element={<LikedSongs/>}></Route>
              <Route path="/dummy" element={<Dummy/>}></Route>
          </Routes>
         
        </BrowserRouter>
    </div>
  )
}

export default App;
