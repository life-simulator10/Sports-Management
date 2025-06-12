import React from 'react';
import Latestcard from './Latestcard';

const Ourlatestmatch = () => {
  return (
    <div className='z-50 w-full text-[#0B1933] mb-[2rem] lg:shadow-xl lg:items-center lg:mt-[-7%] flex flex-col lg:flex-row lg:justify-between lg:max-w-[1140px] lg:max-h-[270px] bg-white py-8 px-8 mx-auto'>
      {/* Centered text for large screens */}
      <div className="flex flex-col items-center lg:justify-center lg:text-center lg:mr-6">
        <h1 className='font-bold text-3xl pl-6 mb-6 lg:mb-0'>Our Latest Match</h1>
        <a href="#" className="text-blue-600 text-sm lg:text-lg lg:self-center">View More &rarr;</a>
      </div>
      <div className="flex flex-col lg:flex-row lg:space-x-4 w-full mb-6">
        <Latestcard />
      </div>
    </div>
  );
}

export default Ourlatestmatch;
