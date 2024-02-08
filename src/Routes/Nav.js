import React from 'react';
import NavButton from '../InputComponent/shared/NavButton';
import { Link } from 'react-router-dom';
import { useUser } from './UserProvider';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';

const Nav = () => {
  const { getUser, signOutUser } = useUser();
  const onChangeHandler=()=>{
    localStorage.removeItem("token");
    signOutUser();
  }

  const navigate = useNavigate();

  return (
        <>
       
      <div className="navbar w-full h-18 bg-neutral-900 rounded-t-lg mt-2 mr-2 bg-opacity-70 flex justify-between items-center">
            <div className='backbutton flex ml-6 gap-2'>
                  <Icon icon="material-symbols:arrow-back-ios-new" width="1.5rem" height="1.5rem"  style={{color: '#a19b9b'}} className='rounded-full bg-black cursor-pointer'
                  onClick={()=>{navigate(-1)}}/>
                  <Icon icon="material-symbols:arrow-forward-ios" width="1.5rem" height="1.5rem"  style={{color: '#a19b9b'}} className='rounded-full bg-black cursor-pointer text-zinc-700 '
                  onClick={()=>{navigate(+1)}}/>
             </div>
          <div className='flex justify-end items-center'>
          {!getUser && <> 
          <Link to="/premium"><NavButton displayText={"Premium"} /></Link>
          <Link to="/support"><NavButton displayText={"Support"} /></Link>
          <Link to="/download"> <NavButton displayText={"Download"} /></Link></>}
          {getUser && getUser.status === 'success' && <NavButton displayText={""} /> && <NavButton displayText={""} /> && 
          <Link to="/premium"><div className='rounded-full bg-white px-4 pr-3.5 py-1.5 text-black hover:scale-105 font-semibold text-sm mr-2'>Explore Premium</div></Link>}
          
          
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
          {getUser && getUser.status === 'success' && <Link to="/" onClick={onChangeHandler}><div className="text-zinc-400 px-5 py-3 my-3 taxt-base flex items-center justify-center ml-4 mr-8 font-semibold cursor-pointer box-border">
          {/* <Icon icon="iconamoon:profile-circle-fill" style={{color: '#918d8d'}} className='h-8 w-8 mr-2'/> */}
            Logout            
          </div></Link>}
          </div>
      </div>
        </>
  )
}

export default Nav;

{/* {getUser && getUser.status === 'success' &&<Link to="/" onClick={onChangeHandler}><NavButton displayText={"Logout"}></NavButton></Link>} */}
