import React from 'react'

const dummy = () => {
  return (
    // main div
    <div className='bg-black w-full h-screen'> 
        {/* nav div */}
       <div className='bg-red-500 w-full h-20 text-white'>
        
         <div className='logodiv pl-4 pt-2'>
          <img src="" alt='logo'></img>
         </div>
       <div className='flex justify-end gap-6 mr-4'>
         <div className='rounded-full'>
          <input type='text' className='rounded-full'></input>
         </div>
         <div>Manage Sabscription</div>
         <div>Login</div>
       </div>
      </div>

        {/* drop down div */}
        <div className='bg-green-500 w-full h-20'>
        dropdown option
        </div>

        {/* music div */}
        <div className='bg-blue-500 w-full h-full'>music</div>
      
    </div>
  )
}

export default dummy
