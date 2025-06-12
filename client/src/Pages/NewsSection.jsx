import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Axios for making API requests
import Newscard from '../components/Newscard.jsx'; // Adjust the path accordingly
import mainCricket from '../Assets/mainCricket.jpg'; // Default image
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import Banner from '../components/Banner.jsx';

const NewsSection = () => {
  const [activeTab, setActiveTab] = useState('author');
  const [authorData, setAuthorData] = useState([]); // State to store author news data
  const [sourcedData, setSourcedData] = useState([]); // State to store sourced news data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [sourcedLoading, setSourcedLoading] = useState(false); // Loading state for sourced news
  const [sourcedError, setSourcedError] = useState(null); // Error state for sourced news

  // Fetching author news from backend on component mount
  useEffect(() => {
    const fetchAuthorNews = async () => {
      try {
        const response = await axios.get('http://localhost:1000/api/news/all'); // Fetching from backend
        setAuthorData(response.data.data); // Assuming the news data is in response.data.data
        setLoading(false); // Set loading to false once data is fetched
      } catch (err) {
        console.error("Error fetching news:", err);
        setError(err.message); // Set error message if the request fails
        setLoading(false);
      }
    };

    fetchAuthorNews();
  }, []);

  // Fetching sourced news when user clicks on the "Sourced" tab
  const fetchSourcedNews = async () => {
    setSourcedLoading(true); // Start loading sourced news
    try {
      const response = await axios.get('https://newsdata.io/api/1/latest?country=np&category=sports&apikey=pub_53091765064b8791aac35706a8317ddca44f9'); // Fetching sourced news from API
      setSourcedData(response.data.results); // Assuming the sourced news data is in response.data.results
      setSourcedLoading(false); // Set loading to false once data is fetched
    } catch (err) {
      console.error("Error fetching sourced news:", err);
      setSourcedError(err.message); // Set error message if the request fails
      setSourcedLoading(false);
    }
  };

  // Trims the title if it's longer than 40 words
  const trimTitle = (title) => {
    const words = title.split(' ');
    return words.length > 40 ? words.slice(0, 30).join(' ') + '...' : title;
  };

  // Function to render content based on active tab
  const renderContent = () => {
    if (loading) {
      return <p>Loading...</p>; // Show loading state while fetching data
    }

    if (error) {
      return <p>Error: {error}</p>; // Show error message if there's an error
    }

    switch (activeTab) {
      case 'author':
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {authorData.map((news, index) => (
              <Newscard
                key={index}
                imageSrc={news.imageLink || mainCricket} // Fallback to default image
                title={trimTitle(news.title)}
                source={news.source}
                description={news.description.slice(0, 30)} // Pass description directly
                link={`/news/${news._id}`} // Assuming _id is the unique identifier
              />
            ))}
          </div>
        );
      case 'sourced':
        if (sourcedLoading) {
          return <p className='text-blue-950'>Loading sourced news...</p>; // Loading state for sourced news
        }

        if (sourcedError) {
          return <p className='text-blue-950'>Error: {sourcedError}</p>; // Error message for sourced news
        }

        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {sourcedData.map((news, index) => (
              <Newscard
                key={news.article_id} // Using article_id as unique key
                imageSrc={news.image_url || mainCricket} // Use image_url from API response or fallback to default
                title={trimTitle(news.title)}
                source={news.source_name}
                description={news.description} // Pass description directly
                link={`/news/${news._id}`} // External link to the full article
                external={true} // Indicating this is an external link
              />
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  // Function to handle tab switching
  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
    if (tab === 'sourced' && sourcedData.length === 0) {
      // Fetch sourced news only if it's not already fetched
      fetchSourcedNews();
    }
  };

  return (
    <>
    <Navbar/>
    <Banner text="News"/>
    <div className="p-8 mt-8 mb-8">
      {/* Button Group */}
      <div className="flex justify-center mb-8 space-x-4">
        <button
          className={`px-6 py-2 rounded-full text-white ${activeTab === 'author' ? 'bg-green-500' : 'bg-black'}`}
          onClick={() => handleTabSwitch('author')}
        >
          Author
        </button>
        <button
          className={`px-6 py-2 rounded-full text-white ${activeTab === 'sourced' ? 'bg-green-500' : 'bg-black'}`}
          onClick={() => handleTabSwitch('sourced')}
        >
          Sourced
        </button>
      </div>

      {/* Content Container with max width 1140px */}
      <div className="max-w-screen-lg mx-auto">
        {renderContent()}
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default NewsSection;
