import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Latestcard = () => {
  const [latestResults, setLatestResults] = useState([]);

  useEffect(() => {
    const fetchLatestResults = async () => {
      try {
        const response = await axios.get('http://localhost:1000/api/result/all');
        setLatestResults(response.data.results);
      } catch (error) {
        console.error('Error fetching latest results:', error);
      }
    };

    fetchLatestResults();
  }, []);

  return (
    <div className="flex justify-between w-full h-auto mt-6 lg:h-[230px] space-x-2">
      {latestResults.slice(0, 2).map((result, index) => (
        <div key={index} className="flex flex-col w-full lg:w-[45%] h-full border border-gray-300">
          {/* Event Name */}
          <h2 className='font-bold text-xl bg-gray-300 text-center py-2 mb-4 lg:mb-2'>
            {result.eventName}
          </h2>
  
          {/* Venue, Date, Time */}
          <div className="text-center text-gray-600 text-sm lg:text-xs px-2 mt-2">
            <p>{result.venue}, {result.date}, {result.time}</p>
          </div>
  
          <div className="flex justify-center items-center px-3 space-x-10 lg:space-x-6 pb-2">
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center">
                {result.imageOne?.url && (
                  <img src={result.imageOne.url} alt={result.teamOne} className="w-28 h-28 lg:w-16 lg:h-16"/>
                )}
                <span className="text-sm lg:text-xs ml-2">{result.scoreOne}</span>
              </div>
              <span className='font-bold text-lg mt-2 lg:text-base text-center'>{result.teamOne}</span>
            </div>
  
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center">
                <span className="text-sm lg:text-xs ml-2">{result.scoreTwo}</span>
                {result.imageTwo?.url && (
                  <img src={result.imageTwo.url} alt={result.teamTwo} className="w-28 h-28 lg:w-16 lg:h-16"/>
                )}
              </div>
              <span className='font-bold text-lg mt-2 lg:text-base text-center'>{result.teamTwo}</span>
            </div>
          </div>
  
          <div className="text-center text-gray-600 text-sm lg:text-xs px-2 mt-2">
            <p>{result.summary}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Latestcard;
