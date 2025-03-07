import React from 'react';
import { Button } from '../ui/button';

import { Link } from 'react-router-dom';
import Footer from './Footer';

function Hero() {
  return (
    <>
    <div className='w-full h-screen bg-cover bg-center  ' style={{ backgroundImage: "url('/mtcty.jpg')" }}> 
    <div className='flex flex-col items-center mx-56 gap-9 text-[#FFFFFF] ' > 
      <h1 className='font-extrabold text-[50px] text-center mt-16 text-[#FFFFFF]' > <span className='text-[#FFA500]'>Plan your perfect trip with our AI-powered travel website</span> smart recommendations, seamless bookings, and hassle-free adventures!</h1>
      <p>Discover new destinations with AI-driven recommendations tailored just for you. Effortlessly plan, book, and explore with real-time travel insights. Experience stress-free journeys with our smart travel assistant!</p>

      <Link to={'/planner'}>

      <Button className='cursor-pointer p-5 border-3' variant="ghost">Let's plane a trip</Button>
      </Link>
    </div>
    </div>

    </>
   
  );
}

export default Hero;
