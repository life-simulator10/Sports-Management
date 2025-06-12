import React, { useEffect, useState } from 'react';
import AppContext from './AppContext';
import axios from 'axios';

const AppState = (props) => {
  const url = "http://localhost:1000/api";

  const [fixtures, setFixtures] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);  

  useEffect(() => {
    const fetchFixtures = async () => {
      try {
        const api = await axios.get(`${url}/fixtures/all`, {
          headers: {
            "Content-Type": "application/json"
          },
          withCredentials: true
        });
        console.log(api.data.fixtures);
        setFixtures(api.data.fixtures);
      } catch (error) {
        console.error('Error fetching fixtures:', error);
        // Optionally, set fixtures to an empty array or show an alert
        // setFixtures([]);
      }
    };
    
    // Check for authentication status
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }

    fetchFixtures();
  }, []);

  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('token'); // Remove token on logout
  };

  return (
    <AppContext.Provider value={{ fixtures, isAuthenticated, login, logout }}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppState;
