import React from 'react';
import Footer from './Footer';

const ComingSoon = () => {
  return (
   
    <div className='bg-neutral-900 lg:md:h-9/10 h-10/11 overflow-y-auto rounded-b-lg justify-center '>
      <div className='border-2 md:w-2/3 h-48 mx-4 md:mx-auto rounded-2xl mt-4 w-5/7 border-green-700 flex justify-center items-center text-4xl md:text-7xl font-mono font-bold text-amber-600'>
        COMING SOON
      </div>
      <div className="mt-16"><Footer /></div>
    </div>
   
  );
};

export default ComingSoon;
