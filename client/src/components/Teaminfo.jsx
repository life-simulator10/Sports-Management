import React from 'react';
import mainCricket from '../Assets/mainCricket.jpg';
import mohankumar from '../Assets/mohan-kumar-shah.png';
import Maniratna from '../Assets/mani-sir.png';
import manichand from '../Assets/mani-chand-sah.png';
import anish from '../Assets/anish.png';
import amrit from '../Assets/amrit-thapa.png';
import Teamcard from './Teamcard';

const Teaminfo = () => {
  return (
    <>

      {/* Team Cards Section */}
      <div className="bg-white p-10">
        <div className="max-w-[1140px] mx-auto">
          {/* Grid container */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Teamcard image={mohankumar} name="Mohan kumar Shah" position="Founder" />
            <Teamcard image={Maniratna} name="Maniratna Kumar Shah" position="CEO" />
            <Teamcard image={manichand} name="Manichand Sah" position="Co-Founder" />
            <Teamcard image={anish} name="Anish Kumar" position="Manager" />
            <Teamcard image={amrit} name="Amrit Thapa" position="Designer" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Teaminfo;
