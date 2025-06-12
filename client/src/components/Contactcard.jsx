import React from 'react';

const Contactcard = (props) => {
  return (
    <div className='text-blue-950 bg-[#EFEFEF] m-4 rounded-lg p-8 flex flex-col justify-center items-center'>
        <div className='bg-green-400 p-2 rounded-full'>
          {props.icon && React.createElement(props.icon, { size: 40 })}
        </div>
        
        <div className='flex flex-col mt-4 text-center'>
          <h1 className='text-xl font-bold tracking-wide'>{props.title}</h1>
          <p className='text-sm'>{props.info}</p>
        </div>
    </div>
  );
};

export default Contactcard;
