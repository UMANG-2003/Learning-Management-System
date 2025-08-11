import React from 'react'
import {dummyEducatorData} from '../../assets/assets';
import {UserButton,useUser} from '@clerk/clerk-react';
import {Link} from "react-router-dom"

function Navbar() {
    const educatorData = dummyEducatorData;
    const {user} = useUser();
  return (
    <div>
      <div className='flex justify-between items-center  px-2  sm:px-4 md:px-14 lg:px-36 py-3 border-b-2 border-gray-800 shadow-2xl shadow-gray-100 bg-gray-950  '>
       <Link to='/'>
       <img src="/logo.png" className='w-28 lg:w-32' alt="" />
       </Link>
       <div className='flex item-center gap-5 text-gray-500 relative'>
          <p>Hi ! {user ? user.fullName : 'Developers'}</p>
          {user ? <UserButton/>: <img className='max-w-8' src={"/logo.png"} />}
       </div>
      </div>
    </div>
  )
}

export default Navbar
