import React, {useState, useEffect} from 'react'
import Nav from './Nav';
import { Link } from 'react-router-dom';
import spotify_logo from "../assets/images/spotify_logo_white.svg";
import { useUser } from "./UserProvider";
import NavButton from '../InputComponent/shared/NavButton';

const Premium = () => {
  const { getUser } = useUser();
  const [isScreenSmall, setIsScreenSmall] = useState(window.innerWidth < 1100);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsScreenSmall(window.innerWidth < 1100);
    };

    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const onChangeHandler=()=>{
    localStorage.removeItem("token");
    signOutUser();
  }
  
  return (
    <div className='bg-blue-600
     h-screen w-full'>
      {isScreenSmall ? 
      ( <div className='bg-black'>
      <Link to='/'><img src={spotify_logo} alt="spotify logo" width={140} className='p-4' /></Link>
      </div>
      ) : (
        <div className='w-full bg-zinc-900 flex items-center pl-8'>
        <Link to='/'><img src={spotify_logo} alt="spotify logo" width={140} /></Link>
            
            <div className="navbar w-full h-18 bg-neutral-900 rounded-t-lg mt-2 mr-2 bg-opacity-70 flex justify-end items-center">
            
          <div className='flex justify-end items-center'>
           
          <Link to="/premium"><NavButton displayText={"Premium"} /></Link>
          <Link to="/support"><NavButton displayText={"Support"} /></Link>
          <Link to="/download"> <NavButton displayText={"Download"} /></Link>
      
          <div className="h-8 border-r-2 border-zinc-600 ml-4"></div>
          { !getUser && <>
            <Link to="/signup">
            <NavButton displayText={"Sign up"}
            />
          </Link>
          <div className="bg-white px-8 py-3 my-3 taxt-base flex items-center justify-center rounded-full ml-4 mr-8 font-semibold cursor-pointer hover:scale-105 hover:bg-green-400">
            <Link to="/login">Log in</Link>
          </div>
          </> }
          {getUser && getUser.status === 'success' && <Link to="/" onClick={onChangeHandler}><div className="text-zinc-400 px-5 py-3 my-3 taxt-base flex items-center justify-center ml-4 mr-8 font-semibold cursor-pointer hover:scale-105 hover:text-white">
            Logout
          </div></Link>}
          </div>
          </div>
        </div> )}

        <div className='text-white felx-col'>
            <h2 className='font-bold  text-center text-4xl mt-40'>Get Premium free for 1 month</h2>
            <h3 className='text-center mt-8 text-lg'>Just ₹119/month after. Debit and credit cards accepted. Canel anytime.</h3>
            <div className='flex justify-center gap-3 mt-8'>
                <Link to="/support"><button className='bg-zinc-900 rounded-full px-5 py-3 font-semibold text-sm hover:scale-105'>GET STARTED</button></Link>
                <Link to="/support"><button className='bg-transparent border rounded-full px-5 py-3 font-semibold text-sm hover:scale-105'>SEE OTHER PLANS</button></Link>
            </div>
            <div className='text-xs mt-14 text-center'>Terms and conditions apply. 1 month free not available for those who already tried primuim.</div>
        </div>
    </div>
  )
}

export default Premium;
