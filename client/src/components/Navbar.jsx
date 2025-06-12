import React, { useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const Navbar = () => {
  const [nav, setNav] = useState(true);
  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <div className="flex bg-[#0B1933] justify-between items-center h-24 w-full mx-auto px-4 text-white border-b-[1px]">
      <h1 className="text-3xl font-bold">B&M.</h1>
      
      {/* Desktop menu */}
      <ul className="hidden md:flex space-x-6 text-base font-semibold tracking-wide">
        <li className="p-4 lg:hover:text-[#3FC2F3] lg:active:text-[#3FC2F3]">
          <Link to="/">Home</Link>
        </li>
        <li className="p-4 lg:hover:text-[#3FC2F3] lg:active:text-[#3FC2F3]">
          <Link to="/about">About Us</Link>
        </li>
        <li className="p-4 lg:hover:text-[#3FC2F3] lg:active:text-[#3FC2F3]">
          <Link to="/events">Events</Link>
        </li>
        <li className="p-4 lg:hover:text-[#3FC2F3] lg:active:text-[#3FC2F3]">
          <Link to="/ourteam">Our Team</Link>
        </li>
        <li className="p-4 lg:hover:text-[#3FC2F3] lg:active:text-[#3FC2F3]">
          <Link to="/gallery">Gallery</Link>
        </li>
        <li className="p-4 lg:hover:text-[#3FC2F3] lg:active:text-[#3FC2F3]">
          <Link to="/newsheadline">News</Link>
        </li>
        <li className="p-4 lg:hover:text-[#3FC2F3] lg:active:text-[#3FC2F3]">
          <Link to="/contact">Contact Us</Link>
        </li>
      </ul>

      {/* Mobile Menu Icon */}
      <div onClick={handleNav} className="block z-50 md:hidden">
        {!nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>

      {/* Mobile menu */}
      <div
        className={
          !nav
            ? 'z-40 fixed left-0 top-0 text-center w-full h-[70%] border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500'
            : 'fixed left-[-100%]'
        }
      >
        <h1 className="w-full text-3xl font-bold m-4">B&M.</h1>
        <ul className="uppercase p-4 ">
          <li className="p-4 border-b border-gray-600 hover:bg-gray-600 hover:text-[#3FC2F3] ">
            <Link to="/">Home</Link>
          </li>
          <li className="p-4 border-b border-gray-600 hover:bg-gray-600 hover:text-[#3FC2F3]">
            <Link to="/about">About Us</Link>
          </li>
          <li className="p-4 border-b border-gray-600 hover:bg-gray-600 hover:text-[#3FC2F3]">
            <Link to="/events">Events</Link>
          </li>
          <li className="p-4 border-b border-gray-600 hover:bg-gray-600 hover:text-[#3FC2F3]">
            <Link to="/ourteam">Our Team</Link>
          </li>
          <li className="p-4 border-b border-gray-600 hover:bg-gray-600 hover:text-[#3FC2F3]">
            <Link to="/gallery">Gallery</Link>
          </li>
          <li className="p-4 border-b border-gray-600 hover:bg-gray-600 hover:text-[#3FC2F3]">
            <Link to="/newsheadline">News</Link>
          </li>
          <li className="p-4 hover:bg-gray-600 hover:text-[#3FC2F3]">
            <Link to="/contact">Contact Us</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
