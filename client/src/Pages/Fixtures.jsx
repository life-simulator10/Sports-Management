import React, { useContext } from 'react';
import AppContext from '../context/AppContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import mainCricket from '../Assets/mainCricket.jpg';

const Fixtures = () => {
    const { fixtures } = useContext(AppContext);
  
    return (
        <>
        <Navbar/>
        <div className="relative w-full h-[45vh]">
        <img 
          src={mainCricket} 
          alt="Main Cricket" 
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        <div className="absolute inset-0 bg-gray-900 opacity-85 z-10"></div>
        <div className="relative z-20 max-w-[800px] w-full h-full mx-auto text-center flex flex-col justify-center">
          <p className='text-5xl tracking-wider font-bold text-white'>Fixtures</p>
        </div>
      </div>
        <div className="container mx-auto my-20 px-4">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Event
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Team A
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Team B
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Venue
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Date
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Time
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            fixtures?.map((fixture) => (
                                <tr key={fixture._id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {fixture.eventName}
                                    </th>
                                    <td className="px-6 py-4">
                                        {fixture.teamOne}
                                    </td>
                                    <td className="px-6 py-4">
                                        {fixture.teamTwo}
                                    </td>
                                    <td className="px-6 py-4">
                                        {fixture.venue}
                                    </td>
                                    <td className="px-6 py-4">
                                        {fixture.date}
                                    </td>
                                    <td className="px-6 py-4">
                                        {fixture.time}
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
        <Footer/>
        </>
    )
}

export default Fixtures;
