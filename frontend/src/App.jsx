import React, { useState } from 'react'
import Navbar from './components/Navbar'
import Title from './components/Title'
import Input from './components/Input'
import CardContainer from './components/CardContainer'

const App = () => {
  const [videos, setVideos] = useState([]);

  const handleVideosFetched = (newVideos) => {
    setVideos(newVideos);
  };

  return (
    <div className='h-screen w-full bg-zinc-900 flex flex-col'>
      <Navbar />
      <Title />
      <Input onVideosFetched={handleVideosFetched} />
      {videos.length > 0 && <CardContainer videos={videos} />}
    </div>
  )
}

export default App