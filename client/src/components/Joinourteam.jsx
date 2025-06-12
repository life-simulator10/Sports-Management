import React from 'react';
import mainCricket from '../Assets/mainCricket.jpg';
import Button from './Button';

const Joinourteam = () => {
  return (
    <div className="relative w-full h-[80vh] overflow-hidden">
      <div
        className="absolute inset-0 w-full h-full bg-fixed"
        style={{
          backgroundImage: `url(${mainCricket})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed', // This enables the parallax effect
        }}
      />
      <div className="absolute inset-0 bg-gray-900 opacity-85 z-10"></div>
      <div className="relative z-20 max-w-[800px] w-full h-full mx-auto text-center flex flex-col justify-center">
        <h2 className='uppercase text-white tracking-[2.5px] font-bold leading-6'>Join Our Team</h2>
        <h2 className='font-bold p-5 lg:6xl md:text-5xl sm:4xl text-2xl md:py-6 uppercase text-white'>
          Join Us for Future Events
        </h2>
        <p className='p-4 px-10 text-white text-[17px] lg:text-lg lg:tracking-wide'>
          Experience the thrill firsthand by joining us for upcoming sports events. Be part of the excitement, and witness the next chapter in the Buba Mummy Sports and Event Management story.
        </p>
        <Button title="Join Us Now"/>
      </div>
    </div>
  );
};

export default Joinourteam;
