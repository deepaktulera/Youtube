import React from 'react';
import { House ,UserRound} from 'lucide-react';
import HomeIcon from '../assets/icons/home-material.svg'
import shortsIcon from "../assets/icons/youtube_shorts.svg";
import subscribeIcon from '../assets/icons/subscriptions.svg';
import userIcon from '../assets/icons/user.svg' 

const Sidebar = () => {
  return (
    <aside className='hidden md:flex flex-col items-start'>
        <button className='flex w-16 h-18 gap-1 flex-col justify-center p-1 items-center hover:bottom-1 hover:bg-gray-200 rounded-xl'><img src={HomeIcon} alt="" /><span className='text-xs'>Home</span></button>
        <button className='flex w-16 h-18 gap-1 flex-col justify-center p-1 items-center hover:bottom-1 hover:bg-gray-200 rounded-xl'><img src={shortsIcon} alt="shorts"/><span className='text-xs'>Shorts</span></button>
        <button className='flex w-16 h-18 gap-1 flex-col justify-center p-1 items-center hover:bottom-1 hover:bg-gray-200 rounded-xl'><img src={subscribeIcon} alt=""/><span className='text-xs'>Subscription</span></button>
        <button className='flex w-16 h-18 gap-1 flex-col justify-center p-1 items-center hover:bottom-1 hover:bg-gray-200 rounded-xl'><img src={userIcon} alt="" /><span className='text-xs'>You</span></button>
    </aside>
  );
}

export default Sidebar;
