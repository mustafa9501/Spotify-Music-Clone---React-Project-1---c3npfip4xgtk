import React from "react";
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
  } from "@material-tailwind/react";
  import { useState } from "react";
  import { Icon } from "@iconify/react";
   
  export default function Cards({src, title, subtitle, alt}) {
    // const [isHover, setIsHover] = useState(false);

    // const handelerMouseOver = ()=>{
    //   setIsHover(true);
    // }
    // const handelerMouseLeave = ()=>{
    //   setIsHover(false);
    // }

    return (

  // <div className="card relative group"
  //     onMouseEnter={() => setIsHover(true)}
  //     onMouseLeave={() => setIsHover(false)}>

      <Card className="mt-6 w-48 bg-zinc-900 hover:bg-zinc-700 cursor-pointer ml-4 mr-2 drop-shadow-md overflow:visible group">
      {/* <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100"> */}
          {/*  onClick={handlePlay}> */}
            
            {/* </div> */}
        <CardHeader color="blue-gray" className="relative h-2 m-4 ">
            <img className="h-40 rounded-md"
              src={src}
              alt={alt}
            />
            <div className="absolute top-12 left-1/3 transform opacity-0 group-hover:opacity-100">
            <Icon icon="entypo:controller-play" width="4rem" height="4rem"  style={{color: '#72d95e'}} /></div>
      {/* {isHover && !isPlaying && ( */}
          
       {/* )}   */}
        </CardHeader> 

        <CardBody>
          <Typography variant="h5" color="white" className="mt-32 text-sm font-semibold flex justify-between">
            <div>{title}</div>
            {/* <div><Icon className='text-xl text-rose-600' icon="streamline:hearts-symbol-solid" /></div> */}
          </Typography>
          <Typography className="text-xs mt-2 text-zinc-400 font-medium truncate">
            {subtitle}
          </Typography>
        </CardBody>
      </Card>
    // </div>
    );
  }
   