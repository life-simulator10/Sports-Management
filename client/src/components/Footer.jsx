import React, { useContext } from 'react';
import { FaFacebook } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { IoLogoWhatsapp } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import AppContext from '../context/AppContext'; // Import the context

const Footer = () => {
    let currentDate = new Date();
    let currentYear = currentDate.getFullYear();

    // Get the context values
    const { isAuthenticated, logout } = useContext(AppContext);

    const handleLogout = () => {
        // Call the logout function from context
        logout();
        // Clear token from localStorage
        localStorage.removeItem('token');
        // Optionally, you can also redirect the user or show a message
        // window.location.href = '/'; // Uncomment if you want to redirect
    };

    return (
        <footer className="relative bg-[#0B1933] pt-8 pb-6">
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap text-left lg:text-left">
                    <div className="w-full lg:w-6/12 px-4">
                        <div className="mt-6 ml-4 lg:mb-0 mb-6 flex space-x-6">
                            <FaFacebook size={30} />
                            <FaSquareXTwitter size={30} />
                            <FaYoutube size={30} />
                            <AiFillInstagram size={30} />
                        </div>
                    </div>
                    <div className="w-full lg:w-6/12 px-4 mt-4">
                        <div className="flex items-top mb-6">
                            <div className="w-full lg:w-4/12 px-4 ml-auto">
                                <span className="block uppercase text-blueGray-500 text-sm font-semibold mb-2">Teams Info</span>
                                <ul className="list-unstyled">
                                    <li>
                                        <a className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm" href="https://www.creative-tim.com/presentation?ref=njs-profile">Player & Staff</a>
                                    </li>
                                    <li>
                                        <a className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm" href="https://blog.creative-tim.com?ref=njs-profile">Fixtures</a>
                                    </li>
                                    <li>
                                        <a className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm" href="https://www.github.com/creativetimofficial?ref=njs-profile">Events</a>
                                    </li>
                                    <li>
                                        <a className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm" href="https://www.creative-tim.com/bootstrap-themes/free?ref=njs-profile">Gallery</a>
                                    </li>
                                </ul>
                            </div>
                            <div className="w-full lg:w-4/12">
                                <span className="block uppercase text-blueGray-500 text-sm font-semibold mb-2">Contact Us</span>
                                <ul className="list-unstyled">
                                    <li className='flex space-x-2'>
                                        <IoLogoWhatsapp /><a className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm" href="https://github.com/creativetimofficial/notus-js/blob/main/LICENSE.md?ref=njs-profile">+61 451 722 046</a>
                                    </li>
                                    <li className='flex space-x-2'>
                                        <MdEmail /> <a className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm" href="https://creative-tim.com/terms?ref=njs-profile">bmsem2023@gmail.com</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <hr className="my-6 border-blueGray-300" />
                <div className="flex flex-wrap items-center md:justify-between justify-center">
                    <div className="w-full md:w-4/12 px-4 mx-auto text-center">
                        <div className="text-sm text-blueGray-500 font-semibold py-1">
                            Copyright © <span>{currentYear}</span> Buba Mummy Sports and Events Managements
                        </div>
                        {isAuthenticated && (
                            <button 
                                onClick={handleLogout} 
                                className="mt-4 text-blueGray-600 hover:text-blueGray-800 font-semibold"
                            >
                                Logout
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
