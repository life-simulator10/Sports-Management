import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Banner from '../components/Banner';

const Gallery = () => {
  const [galleryItems, setGalleryItems] = useState([]); // Initialize as an empty array

  // Fetch gallery data from the backend
  useEffect(() => {
    const fetchGalleryItems = async () => {
      try {
        const response = await axios.get('http://localhost:1000/api/gallery/all');

        // Check if the response contains the galleries array
        if (response.data && Array.isArray(response.data.galleries)) {
          setGalleryItems(response.data.galleries); // Set the fetched gallery items to the state
        } else {
          console.error('Expected an array but got:', response.data);
        }
      } catch (error) {
        console.error('Error fetching gallery data:', error);
      }
    };

    fetchGalleryItems();
  }, []);

  // Function to split gallery items into rows (2 for odd rows, 3 for even rows)
  const splitGalleryItems = (items) => {
    const rows = [];
    let i = 0;

    while (i < items.length) {
      // If odd row (rowIndex % 2 === 0), take 2 items; if even row, take 3 items
      const rowSize = rows.length % 2 === 0 ? 2 : 3;
      rows.push(items.slice(i, i + rowSize));
      i += rowSize;
    }

    return rows;
  };

  const rows = splitGalleryItems(galleryItems); // Split items into rows of 2 and 3 alternately

  return (
    <>
    <Navbar/>
    <Banner text="Gallery"/>
    <div className="flex justify-center items-center min-h-screen my-14">
      <div className="max-w-[1100px] p-4">
        {rows.length === 0 ? (
          <p>No gallery items available</p> // Render a message if no data is present
        ) : (
          rows.map((row, rowIndex) => (
            <div
              key={`row-${rowIndex}`} // Unique key for each row
              className={`grid grid-cols-${row.length} gap-4 mb-4`} // Dynamic grid columns
            >
              {row.map((item) => (
                <div key={item._id} className="relative group">
                  <img
                    src={item.imageLink}
                    alt={item.description}
                    className="w-full h-auto rounded-md object-cover"
                  />
                  {/* Hover Overlay */}
                  <div className="absolute p-10 inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-center items-center">
                    <p className="text-white font-semibold">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ))
        )}
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default Gallery;
