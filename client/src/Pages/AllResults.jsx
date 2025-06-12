import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Banner from '../components/Banner';
import Footer from '../components/Footer';

const AllResults = () => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get('http://localhost:1000/api/result/all');
        setResults(response.data.results);
      } catch (error) {
        console.error('Error fetching results:', error);
      }
    };

    fetchResults();
  }, []);

  return (
    <>
    <Navbar></Navbar>
    <Banner text="Results"></Banner>
    <div className="max-w-[1200px] mx-auto p-4 my-20">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.map((result, index) => (
          <div key={index} className="flex bg-white lg:h-[38vh] flex-col w-full border border-gray-300">
            {/* Event Name */}
            <h2 className='font-bold text-xl text-[#0B1933] bg-gray-300 text-center py-2 mb-4 lg:mb-2'>
              {result.eventName}
            </h2>
  
            {/* Venue, Date, Time */}
            <div className="text-center text-gray-600 text-sm lg:text-xs px-2 mt-2 mb-4">
              <p>{result.venue}, {result.date}, {result.time}</p>
            </div>
  
            <div className="flex justify-center items-center px-3 space-x-10 lg:space-x-6 pb-2">
              {/* Team One */}
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center">
                  {result.imageOne?.url && (
                    <img src={result.imageOne.url} alt={result.teamOne} className="w-28 h-28 lg:w-24 lg:h-24"/>
                  )}
                  <span className="text-sm ml-2 font-bold  text-[#0B1933]">{result.scoreOne}</span>
                </div>
                <span className='font-bold text-[#0B1933] text-lg mt-2 lg:text-base text-center'>{result.teamOne}</span>
              </div>
  
              {/* Team Two */}
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center">
                  <span className="text-sm font-bold mr-2 text-[#0B1933]">{result.scoreTwo}</span>
                  {result.imageTwo?.url && (
                    <img src={result.imageTwo.url} alt={result.teamTwo} className="w-28 h-28 lg:w-24 lg:h-24"/>
                  )}
                </div>
                <span className='font-bold text-lg text-[#0B1933] mt-2 lg:text-base text-center'>{result.teamTwo}</span>
              </div>
            </div>
  
            {/* Summary */}
            <div className="text-center text-gray-600 text-sm lg:text-xs px-2 mt-2">
              <p>{result.summary}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    <Footer></Footer>
    </>
  );
};

export default AllResults;
