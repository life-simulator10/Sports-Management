import React from 'react';
import mainCricket from '../Assets/mainCricket.jpg'; // Image imported inside Banner component

const Banner = (props) => {
  return (
    <div className="relative w-full h-[45vh]">
      <img 
        src={mainCricket} 
        alt="Main Cricket" 
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
      <div className="absolute inset-0 bg-gray-900 opacity-85 z-10"></div>
      <div className="relative z-20 max-w-[800px] w-full h-full mx-auto text-center flex flex-col justify-center">
        <p className='text-5xl tracking-wider font-bold text-white'>{props.text}</p>
      </div>
    </div>
  );
};

export default Banner;
