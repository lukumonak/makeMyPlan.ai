import React from 'react';
import { Button } from '../ui/button';

import { Link } from 'react-router-dom';
import Footer from './Footer';

function Hero() {
  return (
    <>
    <div className='flex flex-col items-center mx-56 gap-9'> 
      <h1 className='font-extrabold text-[50px] text-center mt-16 text-[#3141b9]' > <span className='text-[#FF7A00]'>Plan your perfect trip with our AI-powered travel website</span> smart recommendations, seamless bookings, and hassle-free adventures!</h1>
      <p>Discover new destinations with AI-driven recommendations tailored just for you. Effortlessly plan, book, and explore with real-time travel insights. Experience stress-free journeys with our smart travel assistant!</p>

      <Link to={'/planner'}>

      <Button className='cursor-pointer p-5'>Let's plane a trip</Button>
      </Link>

    </div>
      <img src="/travel.png"  className='w-full -mt-100 -z-10 opacity-30' alt="tavel" />
    </>
   
  );
}

export default Hero;
