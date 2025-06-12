import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaImage } from "react-icons/fa6";
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom'; // Import useNavigate
import { useContext } from 'react';
import AppContext from '../context/AppContext';

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState('match');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AppContext); 

  
  //fixture state management
  const [fixtureData, setFixtureData] = useState({
    eventName: '',
    teamOne: '',
    teamTwo: '',
    venue: '',
    date: '',
    time: '',
  });

  const handleFixtureChange = (e) => {
    setFixtureData({
      ...fixtureData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFixtureSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:1000/api/fixtures/add', fixtureData);
      alert(response.data.message);
    } catch (error) {
      console.error(error);
      alert('Failed to create fixture');
    }
  };

  //match state management
  const [matchData, setMatchData] = useState({
    eventName: '',
    teamOne: '',
    imageOne: '',
    teamTwo: '',
    imageTwo: '',
    venue: '',
    date: '',
    time: '',
  });
  const [fileInputState, setFileInputState] = useState({
    imageOne: '',
    imageTwo: ''
  });
  const [selectedFile, setSelectedFile] = useState({
    imageOne: null,
    imageTwo: null
  });
  const [previewSource, setPreviewSource] = useState({
    imageOne: '',
    imageTwo: ''
  });

  const handleMatchChange = (e) => {
    setMatchData({
      ...matchData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileInputChange = (e, imageKey) => {
    const file = e.target.files[0];
    previewFile(file, imageKey);
    setSelectedFile({
      ...selectedFile,
      [imageKey]: file
    });
    setFileInputState({
      ...fileInputState,
      [imageKey]: e.target.value
    });
  };

  const previewFile = (file, imageKey) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource({
        ...previewSource,
        [imageKey]: reader.result
      });
    };
  };

  const handleMatchSubmit = (e) => {
    e.preventDefault();
    if (!selectedFile.imageOne && !selectedFile.imageTwo) return;

    const readerOne = new FileReader();
    const readerTwo = new FileReader();

    readerOne.readAsDataURL(selectedFile.imageOne);
    readerOne.onloadend = () => {
        readerTwo.readAsDataURL(selectedFile.imageTwo);
        readerTwo.onloadend = async () => {
            try {
                await axios.post('http://localhost:1000/api/match/add', {
                    ...matchData,
                    imageOne: readerOne.result,
                    imageTwo: readerTwo.result
                });
                // Handle success (e.g., clear form, show a success message)
                alert("Successfully Match created");
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        };
    };
};

//Event State Management
const [eventData, setEventData] = useState({
  name: '',
  eventImage: '',
  startDate: null,
  endDate: null,
  desc: ''
});

const [eventFileInputState, setEventFileInputState] = useState('');
const [eventSelectedFile, setEventSelectedFile] = useState(null);
const [eventPreviewSource, setEventPreviewSource] = useState('');

const handleEventChange = (e) => {
  setEventData({
    ...eventData,
    [e.target.name]: e.target.value,
  });
};

const handleEventFileInputChange = (e) => {
  const file = e.target.files[0];
  previewEventFile(file);
  setEventSelectedFile(file);
  setEventFileInputState(e.target.value);
};

const previewEventFile = (file) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onloadend = () => {
    setEventPreviewSource(reader.result);
  };
};

const handleEventSubmit = async (e) => {
  e.preventDefault();
  if (!eventSelectedFile) return;

  const reader = new FileReader();
  reader.readAsDataURL(eventSelectedFile);
  reader.onloadend = async () => {
    try {
      const response = await axios.post('http://localhost:1000/api/event/add', {
        ...eventData,
        eventImage: reader.result,  // Send the image data
      });
      alert(response.data.message);
    } catch (error) {
      console.error('Error uploading event:', error);
      alert('Failed to create event');
    }
  };
};

//point state management
const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState('');
  const [teamData, setTeamData] = useState({
    team: '',
    played: 0,
    win: 0,
    draw: 0,
    loss: 0,
    points: 0,
    nrr: 0,
  });

  // Fetch events from the backend when the component mounts
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:1000/api/event/all');
        setEvents(response.data.events);
        console.log(response.data.events);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  // Handle event selection
  const handleEventTableChange = (e) => {
    setSelectedEvent(e.target.value);
  };

  // Handle input change for team data
  const handlePointInputChange = (e) => {
    const { name, value } = e.target;
    setTeamData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission to send data to the backend
  const handlePointSubmit = async (e) => {
    e.preventDefault();

    if (!selectedEvent) {
      alert('Please select an event');
      return;
    }

    try {
      const response = await axios.post('http://localhost:1000/api/table/add', {
        eventId: selectedEvent,
        ...teamData,
      });

      console.log('Record added:', response.data);
      // Alert message for successful submission
      alert('Record added successfully!');
    } catch (error) {
      console.error('Error adding record:', error);
    }
  };


  //Result state management.........................................................................
  // Result state management
// Result state management
 // Result state management
 const [resultData, setResultData] = useState({
  eventName: '',
  teamOne: '',
  imageOne: '',
  teamTwo: '',
  imageTwo: '',
  summary: '',
  scoreOne: '',
  scoreTwo: ''
});

const [fileResultInputState, setFileResultInputState] = useState({
  imageOne: '',
  imageTwo: ''
});

const [selectedResultFile, setSelectedResultFile] = useState({
  imageOne: null,
  imageTwo: null
});

const [previewResultSource, setPreviewResultSource] = useState({
  imageOne: '',
  imageTwo: ''
});

const handleResultChange = (e) => {
  setResultData({
    ...resultData,
    [e.target.name]: e.target.value,
  });
};

const handleResultFileInputChange = (e, imageKey) => {
  const file = e.target.files[0];
  previewResultFile(file, imageKey);
  setSelectedResultFile({
    ...selectedResultFile,
    [imageKey]: file
  });
  setFileResultInputState({
    ...fileResultInputState,
    [imageKey]: e.target.value
  });
};

const previewResultFile = (file, imageKey) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onloadend = () => {
    setPreviewResultSource({
      ...previewResultSource,
      [imageKey]: reader.result
    });
  };
};

const handleResultSubmit = (e) => {
  e.preventDefault();
  if (!selectedResultFile.imageOne && !selectedResultFile.imageTwo) return;

  const readerOne = new FileReader();
  const readerTwo = new FileReader();

  readerOne.readAsDataURL(selectedResultFile.imageOne);
  readerOne.onloadend = () => {
    readerTwo.readAsDataURL(selectedResultFile.imageTwo);
    readerTwo.onloadend = async () => {
      try {
        await axios.post('http://localhost:1000/api/result/add', {
          ...resultData,
          imageOne: readerOne.result,
          imageTwo: readerTwo.result
        });
        alert("Successfully Result created");
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    };
  };
};


//news state management----------------------------------------
const [newsData, setNewsData] = useState({
  source: '',
  title: '',
  description: '',
  imageLink: ''
});

const handleNewsInputChange = (e) => {
  const { name, value } = e.target;
  setNewsData({
    ...newsData,
    [name]: value
  });
};

const handleNewsSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post('http://localhost:1000/api/news/add', newsData);
    if (response.data.success) {
      alert('News added successfully');
      // Clear the form after successful submission
      setNewsData({
        source: '',
        title: '',
        description: '',
        imageLink: ''
      });
    }
  } catch (err) {
    console.error('Error submitting news:', err);
    alert('Error adding news, please try again.');
  }
};

// Highlights state management -----------------------------------
const [hitsData, setHitsData] = useState({
  link: '',
  teamOne: '',
  teamTwo: ''
});

const handleHitsInputChange = (e) => {
  const { name, value } = e.target;
  setHitsData({
    ...hitsData,
    [name]: value
  });
};

const handleHitsSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post('http://localhost:1000/api/highlights/add', hitsData);
    if (response.data.success) {
      alert('Hits added successfully');
      // Clear the form after successful submission
      setHitsData({
        link: '',
        teamOne: '',
        teamTwo: ''
      });
    }
  } catch (err) {
    console.error('Error submitting hits:', err);
    alert('Error adding hits, please try again.');
  }
};

/*------------------------------gallery statemanagement---------------------------------*/
const [formGalleryData, setFormGalleryData] = useState({
  imageLink: '',
  description: '',
});

const handleGalleryInputChange = (e) => {
  const { name, value } = e.target;
  setFormGalleryData({
    ...formGalleryData,
    [name]: value,
  });
};

const handleGallerySubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.post('http://localhost:1000/api/gallery/add', formGalleryData);
    if (response.status === 201) {
      alert('Gallery item added successfully!');
      // Clear the form fields after successful submission
      setFormGalleryData({
        imageLink: '',
        description: '',
      });
    }
  } catch (error) {
    console.error('Error adding gallery item:', error);
    alert('Failed to add gallery item.');
  }
};

//--------------------------------------------Program State Management----------------------------------------

const [programData, setProgramData] = useState({
  ProgramName: '',
  Date: { start: null, end: null },
  ImageLink: '',
  Description: '',
  Link: ''
});

const handleProgramChange = (e) => {
  const { name, value } = e.target;
  setProgramData({ ...programData, [name]: value });
};

const handleProgramDateChange = (date, field) => {
  setProgramData({ 
      ...programData, 
      Date: { ...programData.Date, [field]: date } 
  });
};

const handleProgramSubmit = async (e) => {
  e.preventDefault();
  try {
      const response = await axios.post('http://localhost:1000/api/program/add', programData);
      alert(response.data.message);
  } catch (error) {
      console.error('Error adding program:', error);
      alert('Failed to add program');
  }
};




  const renderContent = () => {
    switch (activeTab) {
      case 'match':
    return (
        <form className="space-y-4" onSubmit={handleMatchSubmit}>
            <div>
                <label className="block text-gray-700">Event</label>
                <input
                    type="text"
                    name="eventName"
                    onChange={handleMatchChange}
                    value={matchData.eventName}
                    className="w-full p-2 border border-gray-300 rounded text-black"
                />
            </div>
            <div>
                <label className="block text-gray-700">Venue</label>
                <input
                    type="text"
                    name="venue"
                    onChange={handleMatchChange}
                    value={matchData.venue}
                    className="w-full p-2 border border-gray-300 rounded text-black"
                />
            </div>
            <div className="flex space-x-4">
                <div className="flex-1">
                    <label className="block text-gray-700">Date</label>
                    <input
                        type="text"
                        name="date"
                        onChange={handleMatchChange}
                        value={matchData.date}
                        className="w-full p-2 border border-gray-300 rounded text-black"
                    />
                </div>
                <div className="flex-1">
                    <label className="block text-gray-700">Time</label>
                    <input
                        type="text"
                        name="time"
                        onChange={handleMatchChange}
                        value={matchData.time}
                        className="w-full p-2 border border-gray-300 rounded text-black"
                    />
                </div>
            </div>
            <div className="flex items-center">
                <label className="w-1/2 text-gray-700">Team 1</label>
                <div className="flex-1 flex items-center space-x-2">
                    <input
                        type="text"
                        name="teamOne"
                        value={matchData.teamOne}
                        onChange={handleMatchChange}
                        className="w-full p-2 border border-gray-300 rounded text-black"
                    />
                    <label>
                        <FaImage className="text-2xl text-gray-600 cursor-pointer" />
                        <input
                            type="file"
                            name="imageOne"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleFileInputChange(e, 'imageOne')}
                        />
                    </label>
                </div>
            </div>
            {previewSource.imageOne && (
                <img src={previewSource.imageOne} alt="previewOne" className="mt-2 max-h-[70px] max-w-[70px]" />
            )}
            <div className="flex items-center">
                <label className="w-1/2 text-gray-700">Team 2</label>
                <div className="flex-1 flex items-center space-x-2">
                    <input
                        type="text"
                        name="teamTwo"
                        value={matchData.teamTwo}
                        onChange={handleMatchChange}
                        className="w-full p-2 border border-gray-300 rounded text-black"
                    />
                    <label>
                        <FaImage className="text-2xl text-gray-600 cursor-pointer" />
                        <input
                            type="file"
                            name="imageTwo"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleFileInputChange(e, 'imageTwo')}
                        />
                    </label>
                </div>
            </div>
            {previewSource.imageTwo && (
                <img src={previewSource.imageTwo} alt="previewTwo" className="mt-2 max-h-[70px] max-w-[70px]" />
            )}
            <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
                Upload
            </button>
        </form>
    );

        

    case 'events':
      return (
        <form className="space-y-4" onSubmit={handleEventSubmit}>
          <div>
            <label className="block text-gray-700">Event Name</label>
            <input
              type="text"
              name="name"
              value={eventData.name}
              onChange={handleEventChange}
              className="w-full p-2 border border-gray-300 rounded text-black"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Event Image</label>
            <label>
              <FaImage className="text-2xl text-gray-600 cursor-pointer mt-4" />
              <input
                type="file"
                name="eventImage"
                accept="image/*"
                className="hidden"
                onChange={handleEventFileInputChange}
              />
            </label>
            {eventPreviewSource && (
              <img src={eventPreviewSource} alt="event preview" className="mt-2 max-h-[70px] max-w-[70px]" />
            )}
          </div>
          <div>
            <label className="block text-gray-700">Start Date</label>
            <DatePicker
              selected={eventData.startDate}
              onChange={(date) => setEventData({ ...eventData, startDate: date })}
              className="w-full p-2 border border-gray-300 rounded text-black"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">End Date</label>
            <DatePicker
              selected={eventData.endDate}
              onChange={(date) => setEventData({ ...eventData, endDate: date })}
              className="w-full p-2 border border-gray-300 rounded text-black"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Description</label>
            <textarea
              name="desc"
              value={eventData.desc}
              onChange={handleEventChange}
              className="w-full p-2 border border-gray-300 rounded text-black"
              required
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Upload
          </button>
        </form>
      );
    
      case 'points':
        return (
          <form onSubmit={handlePointSubmit} className="space-y-4">
      <div>
        <label className="block text-gray-700">Event</label>
        <select
          className="w-full p-2 border border-gray-300 rounded text-gray-600"
          value={selectedEvent}
          onChange={handleEventTableChange}
        >
          <option value="">Select an event</option>
          {events.map((event) => (
            <option key={event._id} value={event._id}>
              {event.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-gray-700">Team Name</label>
        <input
          type="text"
          name="team"
          value={teamData.team}
          onChange={handlePointInputChange}
          className="w-full p-2 border border-gray-300 rounded text-black"
        />
      </div>
      <div className="grid grid-cols-4 gap-4">
        <div>
          <label className="block text-gray-700">Played</label>
          <input
            type="number"
            name="played"
            value={teamData.played}
            onChange={handlePointInputChange}
            className="w-full p-2 border border-gray-300 rounded text-black"
          />
        </div>
        <div>
          <label className="block text-gray-700">Win</label>
          <input
            type="number"
            name="win"
            value={teamData.win}
            onChange={handlePointInputChange}
            className="w-full p-2 border border-gray-300 rounded text-black"
          />
        </div>
        <div>
          <label className="block text-gray-700">Draw</label>
          <input
            type="number"
            name="draw"
            value={teamData.draw}
            onChange={handlePointInputChange}
            className="w-full p-2 border border-gray-300 rounded text-black"
          />
        </div>
        <div>
          <label className="block text-gray-700">Loss</label>
          <input
            type="number"
            name="loss"
            value={teamData.loss}
            onChange={handlePointInputChange}
            className="w-full p-2 border border-gray-300 rounded text-black"
          />
        </div>
      </div>
      <div>
        <label className="block text-gray-700">Points</label>
        <input
          type="number"
          name="points"
          value={teamData.points}
          onChange={handlePointInputChange}
          className="w-full p-2 border border-gray-300 rounded text-black"
        />
      </div>
      <div>
        <label className="block text-gray-700">NRR</label>
        <input
          type="text"
          name="nrr"
          value={teamData.nrr}
          onChange={handlePointInputChange}
          className="w-full p-2 border border-gray-300 rounded text-black"
        />
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Upload
      </button>
    </form>
        );
        case 'fixtures':
        return (
          <form className="space-y-4" onSubmit={handleFixtureSubmit}>
            <div>
              <label className="block text-gray-700">Event</label>
              <input
                type="text"
                name="eventName"
                value={fixtureData.eventName}
                onChange={handleFixtureChange}
                className="w-full p-2 border border-gray-300 rounded text-black"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Team 1</label>
              <input
                type="text"
                name="teamOne"
                value={fixtureData.teamOne}
                onChange={handleFixtureChange}
                className="w-full p-2 border border-gray-300 rounded text-black"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Team 2</label>
              <input
                type="text"
                name="teamTwo"
                value={fixtureData.teamTwo}
                onChange={handleFixtureChange}
                className="w-full p-2 border border-gray-300 rounded text-black"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Venue</label>
              <input
                type="text"
                name="venue"
                value={fixtureData.venue}
                onChange={handleFixtureChange}
                className="w-full p-2 border border-gray-300 rounded text-black"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Date</label>
              <input
                type="text"
                name="date"
                value={fixtureData.date}
                onChange={handleFixtureChange}
                className="w-full p-2 border border-gray-300 rounded text-black"
                placeholder="Enter date (e.g., 17th May, 2023)"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Time</label>
              <input
                type="text"
                name="time"
                value={fixtureData.time}
                onChange={handleFixtureChange}
                className="w-full p-2 border border-gray-300 rounded text-black"
                placeholder="Enter time (e.g., 7:15 AM)"
                required
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Upload
            </button>
          </form>
        );
      default:
        return null;
      case 'results':
        return (
          <div className="space-y-4">
            <form onSubmit={handleResultSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700">Event Name</label>
                <input
                  type="text"
                  name="eventName"
                  value={resultData.eventName}
                  onChange={handleResultChange}
                  className="w-full p-2 border border-gray-300 rounded text-black"
                  required
                />
              </div>
        
              <div>
                <label className="block text-gray-700">Team One</label>
                <input
                  type="text"
                  name="teamOne"
                  value={resultData.teamOne}
                  onChange={handleResultChange}
                  className="w-full p-2 border border-gray-300 rounded text-black"
                  required
                />
              </div>
        
              <div className="flex items-center">
                <label className="w-1/2 text-gray-700">Team 1 Image</label>
                <div className="flex-1 flex items-center space-x-2">
                  <label>
                    <FaImage
                      className="text-2xl text-gray-600 cursor-pointer"
                      onClick={() => document.querySelector('input[name="imageOne"]').click()}
                    />
                  </label>
                  <input
                    type="file"
                    name="imageOne"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleResultFileInputChange(e, 'imageOne')}
                  />
                </div>
              </div>
              {previewResultSource.imageOne && (
                <img src={previewResultSource.imageOne} alt="previewOne" className="mt-2 max-h-[70px] max-w-[70px]" />
              )}
        
              <div>
                <label className="block text-gray-700">Team Two</label>
                <input
                  type="text"
                  name="teamTwo"
                  value={resultData.teamTwo}
                  onChange={handleResultChange}
                  className="w-full p-2 border border-gray-300 rounded text-black"
                  required
                />
              </div>
        
              <div className="flex items-center">
                <label className="w-1/2 text-gray-700">Team 2 Image</label>
                <div className="flex-1 flex items-center space-x-2">
                  <label>
                    <FaImage
                      className="text-2xl text-gray-600 cursor-pointer"
                      onClick={() => document.querySelector('input[name="imageTwo"]').click()}
                    />
                  </label>
                  <input
                    type="file"
                    name="imageTwo"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleResultFileInputChange(e, 'imageTwo')}
                  />
                </div>
              </div>
              {previewResultSource.imageTwo && (
                <img src={previewResultSource.imageTwo} alt="previewTwo" className="mt-2 max-h-[70px] max-w-[70px]" />
              )}
        
              <div>
                <label className="block text-gray-700">Summary</label>
                <textarea
                  name="summary"
                  value={resultData.summary}
                  onChange={handleResultChange}
                  className="w-full p-2 border border-gray-300 rounded text-black"
                  required
                />
              </div>
        
              <div>
                <label className="block text-gray-700">Score One</label>
                <input
                  type="text"
                  name="scoreOne"
                  value={resultData.scoreOne}
                  onChange={handleResultChange}
                  className="w-full p-2 border border-gray-300 rounded text-black"
                  required
                />
              </div>
        
              <div>
                <label className="block text-gray-700">Score Two</label>
                <input
                  type="text"
                  name="scoreTwo"
                  value={resultData.scoreTwo}
                  onChange={handleResultChange}
                  className="w-full p-2 border border-gray-300 rounded text-black"
                  required
                />
              </div>
        
              <div>
                <label className="block text-gray-700">Venue</label>
                <input
                  type="text"
                  name="venue"
                  value={resultData.venue}
                  onChange={handleResultChange}
                  className="w-full p-2 border border-gray-300 rounded text-black"
                  required
                />
              </div>
        
              <div>
                <label className="block text-gray-700">Date</label>
                <input
                  type="text"
                  name="date"
                  value={resultData.date}
                  onChange={handleResultChange}
                  className="w-full p-2 border border-gray-300 rounded text-black"
                  placeholder='28th August, 2024'
                  required
                />
              </div>
        
              <div>
                <label className="block text-gray-700">Time</label>
                <input
                  type="text"
                  name="time"
                  value={resultData.time}
                  onChange={handleResultChange}
                  className="w-full p-2 border border-gray-300 rounded text-black"
                  placeholder='18:45 or 6:45PM'
                  required
                />
              </div>
        
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Submit Result
              </button>
            </form>
          </div>
        );  
    
      case 'news':
        return (
          <div>
            <form className="space-y-4" onSubmit={handleNewsSubmit}>
              <div>
                <label className="block text-gray-700">Source</label>
                <input
                  type="text"
                  name="source"
                  id="source"
                  value={newsData.source}
                  onChange={handleNewsInputChange}
                  className="w-full p-2 border border-gray-300 rounded text-black"
                  placeholder="Enter source"
                />
              </div>
        
              <div>
                <label className="block text-gray-700">Title</label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={newsData.title}
                  onChange={handleNewsInputChange}
                  className="w-full p-2 border border-gray-300 rounded text-black"
                  placeholder="Enter title"
                />
              </div>
        
              <div>
                <label className="block text-gray-700">Description</label>
                <textarea
                  name="description"
                  id="description"
                  value={newsData.description}
                  onChange={handleNewsInputChange}
                  className="w-full p-2 border border-gray-300 rounded text-black"
                  placeholder="Enter description"
                  rows="4"
                />
              </div>
        
              <div className="flex items-center">
                <label className="w-1/2 text-gray-700">Image Link</label>
                <div className="flex-1 flex items-center space-x-2">
                  <input
                    type="text"
                    name="imageLink"
                    id="imageLink"
                    value={newsData.imageLink}
                    onChange={handleNewsInputChange}
                    className="w-full p-2 border border-gray-300 rounded text-black"
                    placeholder="Enter image link"
                  />
                </div>
              </div>
        
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Upload
              </button>
            </form>
          </div>
        );


      case 'program' :
        return (
          <form className="space-y-4" onSubmit={handleProgramSubmit}>
              <div>
                  <label className="block text-gray-700">Program Name</label>
                  <input
                      type="text"
                      name="ProgramName"
                      value={programData.ProgramName}
                      onChange={handleProgramChange}
                      className="w-full p-2 border border-gray-300 rounded text-black"
                      required
                  />
              </div>
              <div>
                  <label className="block text-gray-700">Start Date</label>
                  <DatePicker
                      selected={programData.Date.start}
                      onChange={(date) => handleProgramDateChange(date, 'start')}
                      className="w-full p-2 border border-gray-300 rounded text-black"
                      required
                  />
              </div>
              <div>
                  <label className="block text-gray-700">End Date</label>
                  <DatePicker
                      selected={programData.Date.end}
                      onChange={(date) => handleProgramDateChange(date, 'end')}
                      className="w-full p-2 border border-gray-300 rounded text-black"
                      required
                  />
              </div>
              <div>
                  <label className="block text-gray-700">Image Link</label>
                  <input
                      type="url"
                      name="ImageLink"
                      value={programData.ImageLink}
                      onChange={handleProgramChange}
                      className="w-full p-2 border border-gray-300 rounded text-black"
                      required
                  />
              </div>
              <div>
                  <label className="block text-gray-700">Description</label>
                  <textarea
                      name="Description"
                      value={programData.Description}
                      onChange={handleProgramChange}
                      className="w-full p-2 border border-gray-300 rounded text-black"
                      required
                  />
              </div>
              <div>
                  <label className="block text-gray-700">Link</label>
                  <input
                      type="url"
                      name="Link"
                      value={programData.Link}
                      onChange={handleProgramChange}
                      className="w-full p-2 border border-gray-300 rounded text-black"
                      required
                  />
              </div>
              <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                  Upload
              </button>
          </form>
      );

      case 'highlights': 
      return (
        <div>
          <form className="space-y-4" onSubmit={handleHitsSubmit}>
            <div>
              <label className="block text-gray-700">YouTube Link</label>
              <input
                type="text"
                name="link"
                id="link"
                value={hitsData.link}
                onChange={handleHitsInputChange}
                className="w-full p-2 border border-gray-300 rounded text-black"
                placeholder="Enter YouTube link"
              />
            </div>
      
            <div>
              <label className="block text-gray-700">Team A</label>
              <input
                type="text"
                name="teamOne"
                id="teamOne"
                value={hitsData.teamOne}
                onChange={handleHitsInputChange}
                className="w-full p-2 border border-gray-300 rounded text-black"
                placeholder="Enter Team A"
              />
            </div>
      
            <div>
              <label className="block text-gray-700">Team B</label>
              <input
                type="text"
                name="teamTwo"
                id="teamTwo"
                value={hitsData.teamTwo}
                onChange={handleHitsInputChange}
                className="w-full p-2 border border-gray-300 rounded text-black"
                placeholder="Enter Team B"
              />
            </div>
      
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Upload
            </button>
          </form>
        </div>
      );

      case 'gallery':
        return(
          <div>
          <form className="space-y-4" onSubmit={handleGallerySubmit}>
            <div>
              <label className="block text-gray-700">Image Link</label>
              <input
                type="text"
                name="imageLink"
                id="imageLink"
                value={formGalleryData.imageLink}
                onChange={handleGalleryInputChange}
                className="w-full p-2 border border-gray-300 rounded text-black"
                placeholder="Enter image link"
              />
            </div>
    
            <div>
              <label className="block text-gray-700">Description</label>
              <textarea
                name="description"
                id="description"
                value={formGalleryData.description}
                onChange={handleGalleryInputChange}
                className="w-full p-2 border border-gray-300 rounded text-black"
                placeholder="Enter description"
                rows="4"
              />
            </div>
    
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Upload
            </button>
          </form>
        </div>
        )
      }
  };

  return (
    <>
      {isAuthenticated ? (
        <div className="p-8">
          <div className="flex justify-between mb-4 space-x-4">
            <button
              className={`flex-1 py-2 px-4 text-white ${activeTab === 'match' ? 'bg-green-500' : 'bg-black'} rounded mr-2`}
              onClick={() => setActiveTab('match')}
            >
              Match
            </button>
            <button
              className={`flex-1 py-2 px-4 text-white ${activeTab === 'events' ? 'bg-green-500' : 'bg-black'} rounded mr-2`}
              onClick={() => setActiveTab('events')}
            >
              Events
            </button>
            <button
              className={`flex-1 py-2 px-4 text-white ${activeTab === 'points' ? 'bg-green-500' : 'bg-black'} rounded mr-2`}
              onClick={() => setActiveTab('points')}
            >
              Points Table
            </button>
            <button
              className={`flex-1 py-2 px-4 text-white ${activeTab === 'fixtures' ? 'bg-green-500' : 'bg-black'} rounded mr-2`}
              onClick={() => setActiveTab('fixtures')}
            >
              Fixtures
            </button>
            <button
              className={`flex-1 py-2 px-4 text-white ${activeTab === 'results' ? 'bg-green-500' : 'bg-black'} rounded`}
              onClick={() => setActiveTab('results')}
            >
              Results
            </button>
            <button
              className={`flex-1 py-2 px-4 text-white ${activeTab === 'news' ? 'bg-green-500' : 'bg-black'} rounded`}
              onClick={() => setActiveTab('news')}
            >
              News
            </button>
            <button
              className={`flex-1 py-2 px-4 text-white ${activeTab === 'highlights' ? 'bg-green-500' : 'bg-black'} rounded`}
              onClick={() => setActiveTab('highlights')}
            >
              Highlights
            </button>
            <button
              className={`flex-1 py-2 px-4 text-white ${activeTab === 'gallery' ? 'bg-green-500' : 'bg-black'} rounded`}
              onClick={() => setActiveTab('gallery')}
            >
              Gallery
            </button>

            <button
              className={`flex-1 py-2 px-4 text-white ${activeTab === 'program' ? 'bg-green-500' : 'bg-black'} rounded`}
              onClick={() => setActiveTab('program')}
            >
              Program
            </button>
          </div>
          <div className="border border-gray-300 p-4 rounded">{renderContent()}</div>
        </div>
      ) : (
        // This block will not render anything while redirecting
        navigate('/'),
        null
      )}
    </>
  );
  
};

export default AdminPage;
