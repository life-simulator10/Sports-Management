import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Contactinfo from '../components/Contactinfo'

const Contact = () => {
  return (
    <div className='flex flex-col'>
        <Navbar/>
        <Contactinfo/>
        <Footer/>
    </div>
  )
}

export default Contact