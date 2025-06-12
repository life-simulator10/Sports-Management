import React, { useState } from 'react';
import axios from 'axios'; // Import Axios
import Contactcard from './Contactcard';
import mainCricket from '../Assets/mainCricket.jpg';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

const Contactinfo = () => {
  // State to manage form inputs
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNo: '',
    message: ''
  });

  const [responseMessage, setResponseMessage] = useState(''); // For success/error messages
  const [isLoading, setIsLoading] = useState(false); // For loading state

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setIsLoading(true); // Start loading

    try {
      const res = await axios.post('http://localhost:1000/api/message/add', formData); // POST request to the backend

      // If successful, display success message and clear form
      setResponseMessage('Message sent successfully!');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phoneNo: '',
        message: ''
      });
    } catch (error) {
      // If error, display error message
      setResponseMessage('Failed to send message. Please try again.');
    } finally {
      setIsLoading(false); // End loading
    }
  };

  return (
    <>
      <div className="relative w-full lg:h-[40vh] h-[26vh]">
        <img 
          src={mainCricket} 
          alt="Main Cricket" 
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        <div className="absolute inset-0 bg-gray-900 opacity-85 z-10"></div>
        <div className="relative z-20 max-w-[800px] w-full h-full mx-auto text-center flex flex-col justify-center">
          <p className='text-3xl font-bold'>Contact Us</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 mt-32 mb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Side Contact Info */}
          <div className="space-y-6">
            <h2 className="text-lg text-blue-900 font-bold">CONTACT US</h2>
            <h1 className="text-4xl font-semibold text-blue-900">Get in touch</h1>

            {/* Office Address */}
            <div className="flex items-start space-x-4">
              <FaMapMarkerAlt className="text-blue-900 w-6 h-6 mt-1" />
              <div>
                <h3 className="font-semibold text-[#081526]">Office Address</h3>
                <p className="text-gray-500">Garuda 04, Garuda Municipality Rautahat Madhesh Province Nepal</p>
              </div>
            </div>

            {/* Contact Info */}
            <div className="flex items-start space-x-4">
              <FaPhoneAlt className="text-blue-900 w-6 h-6 mt-1" />
              <div>
                <h3 className="font-semibold text-[#081526]">Contact</h3>
                <p className="text-gray-500">Phone: +977-9823346695</p>
                <p className="text-gray-500">WhatsApp: +61 451 722 046</p>
              </div>
            </div>

            {/* Email Info */}
            <div className="flex items-start space-x-4">
              <FaEnvelope className="text-blue-900 w-6 h-6 mt-1" />
              <div>
                <h3 className="font-semibold text-[#081526]">Email</h3>
                <p className="text-gray-500">Email: bmsem2023@gmail.com</p>
              </div>
            </div>
          </div>

          {/* Right Side Contact Form */}
          <div className="bg-[#F5F6F7] p-6 shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* First Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Ex. John"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-900 focus:border-blue-900"
                    required
                  />
                </div>

                {/* Last Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Ex. Tailor"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-900 focus:border-blue-900"
                    required
                  />
                </div>
              </div>

              {/* Email and Phone Number */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Your Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="bmsem2023@gmail.com"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-900 focus:border-blue-900"
                    required
                  />
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                  <input
                    type="text"
                    name="phoneNo"
                    value={formData.phoneNo}
                    onChange={handleChange}
                    placeholder="whatsapp +61 451 722 046"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-900 focus:border-blue-900"
                    required
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your message"
                  rows="4"
                  className="mt-1 block w-full p-2 border text-gray-700 border-gray-300 rounded-md focus:ring-blue-900 focus:border-blue-900"
                  required
                />
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  className="w-full py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800 transition"
                  disabled={isLoading}
                >
                  {isLoading ? 'Sending...' : 'Send Message'}
                </button>
              </div>
            </form>

            {/* Response Message */}
            {responseMessage && (
              <div className="mt-4 text-center text-sm text-red-500">
                {responseMessage}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Contactinfo;
