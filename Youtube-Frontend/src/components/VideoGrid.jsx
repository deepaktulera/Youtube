import React from 'react';
import VideoCard from './VideoCard';

const VideoGrid = () => {
  return (
    <div className='p-3 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"'>
      <VideoCard />
      <VideoCard />
      <VideoCard />
      <VideoCard />
      <VideoCard />
    </div>
  );
}

export default VideoGrid;
