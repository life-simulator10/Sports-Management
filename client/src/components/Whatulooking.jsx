import React from 'react';
import Button from './Button';
import { useNavigate } from 'react-router-dom';

const Whatulooking = () => {
  const navigate = useNavigate();

  return (
    <div className='w-full flex flex-col text-[#0B1933] p-6 bg-white'>
      <h1 className='font-bold text-2xl mx-auto mb-4 text-[31px]'>What Are You Looking For?</h1>
      <div className='max-w-[1118px] w-full lg:h-[180px] mx-auto text-center flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4 justify-center'>
        <Button title="Fixtures" onClick={() => navigate('/fixtures')} />
        <Button title="Points Table" onClick={() => navigate('/pointstable')} />
        <Button title="Results" onClick={() => navigate('/results')} />
        <Button title="Highlights" onClick={() => navigate('/highlights')} />
      </div>
    </div>
  );
};

export default Whatulooking;
