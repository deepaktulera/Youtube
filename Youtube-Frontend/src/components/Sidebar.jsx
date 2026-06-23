import React from 'react';
import HomeIcon from '../assets/icons/home-material.svg'
import shortsIcon from "../assets/icons/youtube_shorts.svg";
import subscribeIcon from '../assets/icons/subscriptions.svg';
import userIcon from '../assets/icons/user.svg' 
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className='hidden bg-white h-full md:flex z-100 fixed left-1 top-15 flex-col items-start'>
        <Link to={'/'} className='flex w-16 p-2 h-18 gap-1 flex-col justify-center items-center hover:bottom-1 hover:bg-gray-200 rounded-xl'><img src={HomeIcon} alt="home" /><span className='text-xs'>Home</span></Link>
        <Link to={'/shorts'} className='flex w-16 p-2 h-18 gap-1 flex-col justify-center items-center hover:bottom-1 hover:bg-gray-200 rounded-xl'><img src={shortsIcon} alt="shorts"/><span className='text-xs'>Shorts</span></Link>
        <Link to={'/subscription'} className='flex w-16 p-2 h-18 gap-1 flex-col justify-center items-center hover:bottom-1 hover:bg-gray-200 rounded-xl'><img src={subscribeIcon} alt="subscribe"/><span className='text-xs'>Subscription</span></Link>
        <Link to={'/you'} className='flex w-16 p-2 h-18 gap-1 flex-col justify-center items-center hover:bottom-1 hover:bg-gray-200 rounded-xl'><img src={userIcon} alt="user" /><span className='text-xs'>You</span></Link>
    </aside>
  );
}

export default Sidebar;
