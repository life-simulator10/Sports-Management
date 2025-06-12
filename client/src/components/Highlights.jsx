import React, { useEffect, useState } from 'react';
import Button from './Button';
import HighlightsCard from './HighlightsCard';
import axios from 'axios';

const Highlights = () => {
    const [highlight, setHighlight] = useState(null); // State to store the latest highlight

    // Fetch the latest highlight from the backend
    useEffect(() => {
        const fetchLatestHighlight = async () => {
            try {
                const response = await axios.get('http://localhost:1000/api/highlights/one');
                if (response.data.success) {
                    setHighlight(response.data.data); // Set the latest highlight in state
                } else {
                    console.error('No highlights found');
                }
            } catch (error) {
                console.error('Error fetching the latest highlight:', error);
            }
        };

        fetchLatestHighlight();
    }, []);

    return (
        <div className='bg-gray-100 flex justify-center items-center min-h-screen mt-[-48px]'>
            <div className='max-w-[1140px] p-8'>
                <div className='flex flex-col lg:flex-row'>
                    {/* Use the HighlightsCard component and map props */}
                    {highlight && (
                        <HighlightsCard
                            teamOne={highlight.teamOne}
                            teamTwo={highlight.teamTwo}
                            link={highlight.link}
                        />
                    )}

                    <div className='lg:w-1/2 lg:pl-16 lg:mt-4 lg:mt-0'>
                        <h2 className='text-[16px] tracking-[2px] font-bold text-gray-700'>
                            MATCH RESULTS
                        </h2>
                        <h3 className='text-[31px] font-extrabold tracking-[2.5px] text-gray-900 mt-3'>
                            WATCH OUR PREVIOUS MATCH RESULTS
                        </h3>
                        <p className='text-gray-700 mt-3 tracking-[0.4px]'>
                            Relive the thrill and triumphs of Buba Mummy Sports and Event
                            Management through our past match results. We take pride in the
                            memorable moments and outstanding performances that have shaped
                            our journey in the world of sports.
                        </p>
                        <div>
                            <a
                                href='https://www.youtube.com/watch?v=dQw4w9WgXcQ'
                                target='_blank'
                                rel='noopener noreferrer'
                            >
                                <Button title="Watch More" className={"rounded-none lg:w-16"} />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Highlights;
