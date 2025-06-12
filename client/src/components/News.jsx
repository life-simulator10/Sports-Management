import React from 'react';
import mainCricket from '../Assets/mainCricket.jpg';
import Newscard from './Newscard';

const News = () => {
  return (
    <div className="w-full flex flex-col justify-center py-12 px-4">
      {/* Headers */}
      <h1 className='font-bold text-sm text-[#0B1933] mx-auto mb-2 uppercase tracking-widest text-center'>Our Resources</h1>
      <h1 className='font-bold text-3xl text-[#0B1933] mx-auto mb-6 text-center'>News & Updates</h1>
      
      {/* Cards Container */}
      <div className="flex justify-center items-center flex-wrap max-w-[1140px] mx-auto my-14">
        <Newscard
          imageSrc={mainCricket} // Replace with your image path
          title="WOMEN'S T-20 CHAMPIONSHIP"
          source="NEWS"
          description="Read More"
          link="/news/womens-t20-championship" // Example link
        />
        <Newscard
          imageSrc={mainCricket} // Replace with your image path
          title="महिला टी-२० र तीन दिवसीय क्रिकेट प्रतियोगिता"
          source="MATCH"
          description="Read More"
          link="/news/womens-t20-three-day" // Example link
        />
        <Newscard
          imageSrc={mainCricket} // Replace with your image path
          title="CAPTAIN NAME ANNOUNCEMENT"
          source="NEWS"
          description="Read More"
          link="/news/captain-name-announcement" // Example link
        />
      </div>
    </div>
  );
};

export default News;
