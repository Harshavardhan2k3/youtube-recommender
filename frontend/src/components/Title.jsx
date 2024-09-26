import React from 'react'

function Title() {
  return (
    <div className='w-screen select-none flex flex-col text-white tracking-normal h-16 mt-32 font-bold items-center justify-center'>
      <h1 className='text-4xl'>Youtube Recommender</h1>
      <p className='font-mono opacity-40 mt-1'>start by entering a video url.</p>
    </div>
  )
}

export default Title