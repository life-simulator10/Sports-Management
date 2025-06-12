import React from 'react'
import Upcomingcard from './Upcomingcard'

const Upcoming = () => {
  return (
    <div className='w-full bg-[#0B1933] flex flex-col justify-center py-12 px-4'>

        <h1 className='font-bold text-sm mx-auto mb-6 uppercase tracking-wider'>Upcoming Game</h1>
        <h1 className='font-bold text-3xl mx-auto mb-6'>Upcoming Match</h1>
        <Upcomingcard/>
    </div>
  )
}

export default Upcoming