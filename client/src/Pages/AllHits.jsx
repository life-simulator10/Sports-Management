import React, { useEffect, useState } from 'react';
import axios from 'axios';
import HighlightsCard from '../components/HighlightsCard';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Banner from '../components/Banner';

const AllHits = () => {
    const [highlights, setHighlights] = useState([]);

    useEffect(() => {
        const fetchHighlights = async () => {
            try {
                const response = await axios.get('http://localhost:1000/api/highlights/all');
                if (response.data.success) {
                    setHighlights(response.data.data);
                } else {
                    console.error('No highlights found');
                }
            } catch (error) {
                console.error('Error fetching highlights:', error);
            }
        };
        
        fetchHighlights();
    }, []);

    return (
        <>
            <Navbar />
            <Banner text="Highlights"/>
            <div className="bg-gray-100 min-h-screen py-8">
                <div className="mx-auto max-w-[1140px] px-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                        {highlights.length > 0 ? (
                            highlights.map((highlight) => (
                                <div key={highlight._id} className="flex justify-center">
                                    <div className="w-full">
                                        <HighlightsCard
                                            teamOne={highlight.teamOne}
                                            teamTwo={highlight.teamTwo}
                                            link={highlight.link}
                                            lgWidth="lg:w-full"
                                        />
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="col-span-full text-center text-gray-500">No highlights available</p>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default AllHits;