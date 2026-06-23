import React from 'react';

const VideoCard = () => {
  return (
    <div className='w-full rounded-2xl'>
      <div className=''>
        <img src="https://images.unsplash.com/photo-1630563451961-ac2ff27616ab?crop=entropy&cs=srgb&fm=jpg&ixid=M3w5MjY1MDh8MHwxfHNlYXJjaHwxfHxhcHBsZXxlbnwwfHx8fDE3NzY0MDU1MzJ8MA&ixlib=rb-4.1.0&q=85" alt="" className='w-full rounded-2xl h-60 object-cover object-center' />
      </div>
      <div className='flex gap-2 items-center'>
        <div className='h-5 w-5'><img src="https://www.bing.com/th/id/OIP.hXWwNOQw15ZVWKlMs-xv0wHaFQ?w=193&h=137&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2" alt="" className='object-cover w-full h-full rounded-full' /></div>
        <div>
            <h2>The js</h2>
            <h2>Harry</h2>
        </div>
      </div>
    </div>
  );
}

export default VideoCard;
