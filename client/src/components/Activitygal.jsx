import React from 'react';

const Activitygal = () => {
    return (
        <div className=" flex justify-center items-center min-h-screen">
            <div className="max-w-[1200px] p-4">
                {/* Top Row - Two Images */}
                <div className="flex space-x-4 mb-4">
                    <div className="flex-1">
                        <img
                            src="https://via.placeholder.com/600x300"
                            alt="Image1"
                            className="w-full h-auto rounded-md object-cover"
                        />
                    </div>
                    <div className="flex-1">
                        <img
                            src="https://via.placeholder.com/600x300"
                            alt="Image2"
                            className="w-full h-auto rounded-md object-cover"
                        />
                    </div>
                </div>

                {/* Bottom Row - Three Images */}
                <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-1">
                        <img
                            src="https://via.placeholder.com/400x300"
                            alt="Image3"
                            className="w-full h-auto rounded-md object-cover"
                        />
                    </div>
                    <div className="col-span-1">
                        <img
                            src="https://via.placeholder.com/400x300"
                            alt="Image4"
                            className="w-full h-auto rounded-md object-cover"
                        />
                    </div>
                    <div className="col-span-1">
                        <img
                            src="https://via.placeholder.com/400x300"
                            alt="Image5"
                            className="w-full h-auto rounded-md object-cover"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Activitygal;
