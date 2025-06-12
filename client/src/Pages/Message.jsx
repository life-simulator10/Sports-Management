import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom'; 
import Messagecard from '../components/Messagecard'; 
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Message = () => {
  const [messages, setMessages] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const navigate = useNavigate(); 

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      // If no token is found, redirect to the home page
      navigate('/');
      return;
    }

    const fetchMessages = async () => {
      try {
        const response = await axios.get('http://localhost:1000/api/message/all', {
          headers: {
            'Auth': token,
          },
        });
        setMessages(response.data.data); 
      } catch (err) {
        console.error(err); // Log full error for debugging
        
        // Check if the error response contains "Invalid Token"
        if (err.response && err.response.data.message === "Invalid Token") {
          // Redirect to home page if token is invalid
          navigate('/');
          return;
        }
        
        // For other errors, set the error state
        setError(err.response ? err.response.data.message : err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>; 
  }

  if (error) {
    return <div>Error: {error}</div>; 
  }

  return (
    <>
      <Navbar />
      <div className="max-w-[1200px] mx-auto p-6 mt-20 mb-32">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {messages.map((message) => (
            <Messagecard key={message._id} message={message} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Message;
