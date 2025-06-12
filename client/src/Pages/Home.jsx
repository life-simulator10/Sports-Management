import React from 'react'
import Navbar from '../components/Navbar'
import Maintro from '../components/Maintro'
import Ourlatestmatch from '../components/Ourlatestmatch'
import Whatulooking from '../components/Whatulooking'
import Joinourteam from '../components/Joinourteam'
import Upcoming from '../components/Upcoming'
import News from '../components/News'
import Footer from '../components/Footer'
import Highlights from '../components/Highlights'
import ActivitySection from '../components/ActivitySection'

const Home = () => {
  return (
    <div className='flex flex-col'>
    <Navbar/>
    <Maintro/>
    <Ourlatestmatch/>
    <Highlights/>
    <Whatulooking/>
    <Joinourteam/>
    <Upcoming/>
    <ActivitySection/>
    <News/>
    <Footer/>
    </div>
  )
}

export default Home