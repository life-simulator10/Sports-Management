import React from 'react';
import mainCricket from '../Assets/mainCricket.jpg';
import mohanKumarShah from '../Assets/mohan-kumar-shah.png';

const Aboutinfo = () => {
  return (
    <>
      <div className="relative w-full lg:h-[60vh] h-[26vh]"> 
        <img 
          src={mainCricket} 
          alt="Main Cricket" 
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        <div className="absolute inset-0 bg-gray-900 opacity-85 z-10"></div>
        <div className="relative z-20 max-w-[800px] w-full h-full mx-auto text-center flex flex-col justify-center">
          <p className='text-5xl tracking-wider font-bold text-white'>About Us</p>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-col items-center mt-8 px-4 lg:px-0">
        {/* Container with white background and max width for large screens */}
        <div className="bg-white lg:mt-[-10%] z-50 lg:p-[2rem] lg:max-w-[1100px] w-full lg:flex lg:flex-row lg:justify-between lg:items-start lg:space-x-8 p-6">
          {/* Left side content - Centered vertically */}
          <div className="lg:w-1/2 lg:pt-8 lg:flex lg:flex-col lg:justify-center lg:text-left text-center">
            <h1 className="text-blue-950 text-xl font-bold tracking-[0.2rem] uppercase">
              The History Of Buba Mummy SEM
            </h1>
            <p className="text-blue-950 text-sm mt-4">
              Welcome to Buba Mummy Sports and Events Managements-BMSEM. At BMSEM, founded in 2023, we continuously strive to provide credible and trustworthy services to people from all over the world to help them grow. We keep our people’s welfare and satisfaction at the center. Our mission is to bring fresh and passionate people to society, engaging youth in social services and organizing activities that help communities in Nepal.
            </p>
          </div>

          {/* Right side image */}
          <div className="lg:w-1/3 mt-8 lg:mt-0 border-2 border-gray-300 p-1">
            <img 
              src={mohanKumarShah} 
              alt="mohanKumarShah" 
              className="w-full object-cover max-h-[34vh]"
            />
          </div>
        </div>
      </div>

      {/* Additional Content Section */}
      <div className='flex flex-col my-8 px-4 lg:px-0'>
        <div className='lg:max-w-[900px] w-full mx-auto'>
          <h1 className='text-sm font-bold text-blue-950 tracking-[2px] uppercase mt-4'>Mohan Kumar Sah & Mrinalini Devi</h1>
          <h1 className='text-sm font-bold text-blue-600 tracking-[2px] uppercase'>Founder</h1>
          <p className='text-sm text-blue-950 mt-6'>
            At Buba Mummy Sports and Event Management, we’re passionate about creating unforgettable experiences in the realm of sports and events. Founded on the belief that every game has the power to bring people together, we specialize in organizing dynamic tournaments and managing high-energy events that leave a lasting impact.
          </p>
          
          <h1 className='text-sm font-bold text-blue-950 tracking-[2px] uppercase mt-4'>Our Mission</h1>
          <p className='text-sm text-blue-950 mt-6'>
            Our mission is simple: to foster a vibrant community through the love of sports and the thrill of competition. Whether it’s organizing a local tournament, hosting a corporate team-building event, or managing a large-scale sporting extravaganza, we’re dedicated to delivering excellence every step of the way.
          </p>

          <h1 className='text-sm font-bold text-blue-950 tracking-[2px] uppercase mt-4'>What Sets Us Apart</h1>
          <p className='text-sm text-blue-950 mt-6 mb-10'>
            What sets us apart is our unwavering commitment to quality, integrity, and innovation. With a team of seasoned professionals who are experts in their respective fields, we strive to exceed expectations and surpass industry standards. From meticulous planning to flawless execution, we leave no stone unturned in ensuring that every event is a resounding success.
          </p>
        </div>
      </div>
    </>
  )
}

export default Aboutinfo;
