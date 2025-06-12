import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';

const NewsDetail = () => {
  const { id } = useParams(); // Get the newsId from the URL
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Utility function to format the date with ordinal suffixes
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();

    // Function to add ordinal suffix
    const getOrdinalSuffix = (day) => {
      if (day > 3 && day < 21) return 'th'; // because 11th, 12th, 13th
      switch (day % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
      }
    };

    return `${day}${getOrdinalSuffix(day)} ${month}, ${year}`;
  };

  useEffect(() => {
    const fetchNewsDetail = async () => {
      try {
        const response = await axios.get(`http://localhost:1000/api/news/${id}`);
        setNews(response.data.data); // Assuming your API response returns the data in this format
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchNewsDetail();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <Navbar />
      <div className="max-w-[1050px] bg-white mx-auto p-10">
        {news ? (
          <>
            <div className="w-full h-[600px] mx-auto">
              <img
                src={news.imageLink || 'https://w0.peakpx.com/wallpaper/935/795/HD-wallpaper-boxing-sports-graphy.jpg'} // Use fallback image if imageLink is not available
                alt={news.title}
                className="w-full h-full object-cover rounded"
              />
            </div>

            {/* Date */}
            <p className="text-gray-500 text-sm mt-4 text-right">
              {news.createdAt ? formatDate(news.createdAt) : '29th September, 2024'}
            </p>

            {/* Title */}
            <h1 className="text-3xl font-bold mt-2 text-[#0B1933]">{news.title || 'Here I am telling the world about Muhammad Ali and other many people'}</h1>

            {/* Description */}
            <p className="text-base text-gray-700 mt-4">
              {news.description || 'Here I am telling the world about Muhammad Ali and other people. This is where the story continues and elaborates further.'}
            </p>
          </>
        ) : (
          <p>News not found</p>
        )}
      </div>
      <Footer />
    </>
  );
};

export default NewsDetail;
