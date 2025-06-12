// src/components/Newscard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import mainCricket from '../Assets/mainCricket.jpg';

const Newscard = ({ imageSrc, title, source, description, link }) => {
  const truncateTitle = (title) => {
    const words = title.split(' ');
    return words.length > 40 ? words.slice(0, 40).join(' ') + '...' : title;
  };

  return (
    <div className="max-w-xs bg-white shadow-lg rounded-lg overflow-hidden mx-4 mb-6">
      <img
        className="w-full h-48 object-cover"
        src={imageSrc || mainCricket} // Use fallback image if imageSrc is not available
        alt={title}
      />
      <div className="p-4">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{source}</span>
        <h2 className="mt-2 text-2xl font-bold text-[#0B1933]">{truncateTitle(title)}</h2>
        {description && <p className="mt-2 text-black">{description}</p>}
        <Link to={link}>
          <button className="mt-3 inline-block bg-blue-950 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2">
            Read More
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Newscard;
