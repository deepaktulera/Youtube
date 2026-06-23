import React from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

const Home = () => {
  return (
    <div>
      <Header />
      <section className='grid grid-cols-[1fr_9fr]'>
      <Sidebar />
      </section>
    </div>
  );
}

export default Home;
