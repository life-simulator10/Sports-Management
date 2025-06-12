import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Banner from '../components/Banner';
import Footer from '../components/Footer';

const Table = () => {
  const [expandedRows, setExpandedRows] = useState([]); // State to manage expanded rows
  const [events, setEvents] = useState([]); // State to store fetched events

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:1000/api/table/all');
        const data = response.data.tables || [];
        setEvents(data);

        // Automatically expand the first event
        if (data.length > 0) {
          setExpandedRows([data[0]._id]);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleRowToggle = (eventId) => {
    setExpandedRows((prevExpandedRows) =>
      prevExpandedRows.includes(eventId)
        ? prevExpandedRows.filter((row) => row !== eventId)
        : [...prevExpandedRows, eventId]
    );
  };

  return (
    <>
    <Navbar/>
    <Banner text="Standings" />
    <div className="container mx-auto px-4 py-8">
      {events.map((event) => (
        <div
          key={event._id}
          className="mb-4 max-w-screen-lg mx-auto bg-white rounded-lg shadow-lg"
        >
          <div
            className="bg-gray-200 cursor-pointer p-4 text-black font-bold rounded-t-lg"
            onClick={() => handleRowToggle(event._id)}
          >
            {event.eventId?.name || 'Unknown Event'}{' '}
            <span className="float-right">
              {expandedRows.includes(event._id) ? '▲' : '▼'}
            </span>
          </div>
          <div
            className={`overflow-hidden transition-all duration-300 ${
              expandedRows.includes(event._id) ? 'max-h-screen' : 'max-h-0'
            }`}
          >
            <table className="w-full table-auto border-collapse text-black">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="py-2 px-4">Team</th>
                  <th className="py-2 px-4">Played</th>
                  <th className="py-2 px-4">Win</th>
                  <th className="py-2 px-4">Draw</th>
                  <th className="py-2 px-4">Loss</th>
                  <th className="py-2 px-4">NRR</th>
                  <th className="py-2 px-4">Points</th>
                </tr>
              </thead>
              <tbody>
                {event.record?.map((item, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                  >
                    <td className="py-2 px-4">{item.team}</td>
                    <td className="py-2 px-4">{item.played}</td>
                    <td className="py-2 px-4">{item.win}</td>
                    <td className="py-2 px-4">{item.draw}</td>
                    <td className="py-2 px-4">{item.loss}</td>
                    <td className="py-2 px-4">{item.nrr}</td>
                    <td className="py-2 px-4">{item.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
    <Footer/>
    </>
  );
};

export default Table;
