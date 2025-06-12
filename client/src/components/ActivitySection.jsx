import React from 'react'
import Activitygal from './Activitygal'

const ActivitySection = () => {
  return (
    <>
        <div className="w-full  flex flex-col justify-center py-12 px-4 ">
      {/* Headers */}
      <h1 className='font-bold text-sm text-[#0B1933] mx-auto mb-2 uppercase tracking-widest text-center'>Our Resources</h1>
      <h1 className='font-bold text-3xl text-[#0B1933] mx-auto mb-6 text-center'>Activity Gallery</h1>
      <Activitygal/>
    </div>
    </>
  )
}

export default ActivitySection