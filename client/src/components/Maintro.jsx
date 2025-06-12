import React from 'react';
import mainCricket from '../Assets/mainCricket.jpg';

const Maintro = () => {
  return (
    <div className="relative w-full h-[90vh]">
      <img 
        src={mainCricket} 
        alt="Main Cricket" 
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
      <div className="absolute inset-0 bg-gray-900 opacity-85 z-10"></div>
      <div className="relative z-20 max-w-[800px] w-full h-full mx-auto text-center flex flex-col justify-center">
        <h2 className='font-bold p-5 lg:6xl md:text-5xl sm:4xl text-2xl md:py-6 uppercase tracking-wide text-white'>
          Welcome to Buba Mummy Sports and Events Managements
        </h2>
        <p className='p-4 px-10 text-white lg:text-lg lg:tracking-wide leading-6'>
          At Buba Mummy, we believe in the power of sports to bring people together, inspire excellence, and create unforgettable moments. As World’s premier sports and event management company, we are dedicated to orchestrating world-class sports events that transcend the ordinary.
        </p>
      </div>
    </div>
  )
}

export default Maintro;
