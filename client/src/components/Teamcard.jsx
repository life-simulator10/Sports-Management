import React from 'react';

const Teamcard = (props) => {
  return (
    <div className="w-full max-w-[22rem] mx-auto bg-[#050519] p-4 rounded-xl shadow-lg overflow-hidden mt-6">
      <div className="rounded-full flex justify-center items-center">
        <img 
          src={props.image} 
          alt={props.name} 
          className="w-[150px] h-[150px] object-fill rounded-full border-[3px] border-white"
        />
      </div>
      <div className="p-6 bg-[#050519] text-center text-white">
        <h2 className="text-xl sm:tracking-wide font-bold">{props.name}</h2>
        <p className="text-sm tracking-widest text-gray-300">{props.position}</p>
      </div>
    </div>
  );
};

export default Teamcard;
