import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Aboutinfo from '../components/Aboutinfo'

const About = () => {
  return (
    <div className='flex flex-col'>
        <Navbar/>
        <Aboutinfo/>
        <Footer/>
    </div>
  )
}

export default About