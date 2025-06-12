import React, { useEffect, useState } from 'react';
import axios from 'axios';
import bmBlastersLogo from '../Assets/teamone.jpeg';
import apfLogo from '../Assets/teamtwo.png';

const Upcomingcard = () => {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await axios.get('http://localhost:1000/api/match/all');
        setMatches(response.data.matches);
      } catch (error) {
        console.error('Error fetching matches:', error);
      }
    };

    fetchMatches();
  }, []);

  return (
    <div className="w-full flex flex-col items-center space-y-6">
      {matches.map((match, index) => (
        <div
          key={index}
          className="w-full max-w-[1118px] lg:h-[283px] border border-blue-500 border-opacity-30 hover:border-opacity-60 text-white flex flex-col lg:flex-row justify-between items-center p-6 lg:p-10 space-y-6 lg:space-y-0 mx-auto"
          style={{
            background: 'linear-gradient(166deg, #0D1E3D 50%, #0C1C38 50%)',
          }}
        >
          {/* Team One Section */}
          <div className="flex flex-col items-center lg:w-1/3">
            <img
              src={match.imageOne?.url || bmBlastersLogo}
              alt={match.teamOne}
              className="w-32 h-32 mb-2"
            />
            <span className="font-bold text-lg mt-1">{match.teamOne}</span>
          </div>

          {/* VS Section */}
          <div className="flex justify-center items-center">
            <span className="font-bold text-xl bg-gray-600 text-white px-4 py-2 border-2 border-solid border-white">
              VS
            </span>
          </div>

          {/* Team Two Section */}
          <div className="flex flex-col items-center lg:w-1/3">
            <img
              src={match.imageTwo?.url || apfLogo}
              alt={match.teamTwo}
              className="w-32 h-32 mb-2"
            />
            <span className="font-bold text-lg mt-1">{match.teamTwo}</span>
          </div>

          {/* Match Info Section */}
          <div className="flex flex-col justify-center items-center text-center lg:w-1/3 space-y-2">
            <div className="text-[#92acbe] uppercase tracking-normal font-semibold">
              {match.eventName}
            </div>
            <div className="text-white font-bold tracking-wider text-xl">
              {match.date} {match.time}
            </div>
            <div className="text-[#92acbe]">
              {match.venue}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Upcomingcard;
