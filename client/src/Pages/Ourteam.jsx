import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Teaminfo from '../components/Teaminfo'
import Banner from '../components/Banner'

const Ourteam = () => {
  return (
    <div className='flex flex-col'>
        <Navbar/>
        <Banner text="Our Team"/>
        <Teaminfo/>
        <Footer/>
    </div>
  )
}

export default Ourteam