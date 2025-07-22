import React from 'react'


function Hero() {
  return (
    <div className='flex flex-col items-center justify-center w-full md:pt-30 pt-16 px-7 md:px-0 space-y-7 text-center bg-gradient-to-b from-cyan-100/70'>
        <h1 className='md:text-5xl text-2xl relative font-bold text-gray-800 max-w-5xl mx-auto'>
            Welcome to the Learning Management System, where knowledge meets innovation and <span className='text-blue-600'>education is redefined.</span>
        </h1>

        <p className='md:block hidden text-gray-500 max-w-2xl mx-auto'>
            Join us in our mission to make quality education accessible to all.
        </p>
        <p className='md:hidden block text-gray-500 max-w-2xl mx-auto'>
            Join us in our mission to make quality education accessible to all. Explore courses, connect with educators, and embark on a journey of lifelong learning.
        </p>
    </div>
  )
}

export default Hero
