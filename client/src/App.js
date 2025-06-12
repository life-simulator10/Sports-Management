// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home.jsx';
import Contact from './Pages/Contact.jsx';
import About from './Pages/About.jsx';
import Ourteam from './Pages/Ourteam.jsx';
import Fixtures from './Pages/Fixtures.jsx';
import AdminPage from './Pages/Admin.jsx';
import NewsSection from './Pages/NewsSection.jsx';
import Table from './Pages/Table.jsx';
import AuthForm from './Pages/Login.jsx';
import AllHits from './Pages/AllHits.jsx';
import Message from './Pages/Message.jsx';
import NewsDetail from './Pages/NewsDetail.jsx';
import Gallery from './Pages/Gallery.jsx';
import AllResults from './Pages/AllResults.jsx';
import AppState from './context/AppState';  // Import AppState

const App = () => {
  return (
    <AppState>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/events' element={<Fixtures />} />
          <Route path='/ourteam' element={<Ourteam />} />
          <Route path='/gallery' element={<Gallery />} />
          <Route path='/newsheadline' element={<NewsSection />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/admin' element={<AdminPage />} />
          <Route path='/login' element={<AuthForm />} />
          <Route path='/hits' element={<AllHits />} />
          <Route path='/message' element={<Message />} />
          <Route path="/news/:id" element={<NewsDetail />} />
          <Route path='/fixtures' element={<Fixtures />} />
          <Route path='/pointstable' element={<Table />} />
          <Route path='/results' element={<AllResults />} />
          <Route path='/highlights' element={<AllHits />} />
        </Routes>
      </Router>
    </AppState>
  );
};

export default App;
