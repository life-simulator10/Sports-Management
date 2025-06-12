import React from 'react';

const HighlightsCard = ({ teamOne, teamTwo, link, lgWidth = 'lg:w-1/2' }) => {
    return (
        <div className={`relative border-2 border-gray-200 p-2 w-full ${lgWidth}`}>
            <img
                src='https://media.istockphoto.com/id/1204517943/photo/wicket-keeper-preparing-to-catch-the-ball.jpg?s=1024x1024&w=is&k=20&c=ZRBLFVIhNY4elJNOL8CcFcXmqHKTYzO1_8lROQQO72Q='
                alt='Cricket Image'
                className='w-[548px] h-[296px] object-cover opacity-70'
            />
            <a
                href={link}
                target='_blank'
                rel='noopener noreferrer'
                className='absolute inset-0 flex items-center justify-center'
            >
                <div className='bg-white p-4 rounded-full shadow-lg'>
                    <svg
                        className='w-12 h-12 text-red-600'
                        fill='currentColor'
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 24 24'
                    >
                        <path d='M21.8 8.001a3 3 0 0 0-2.118-2.122C17.92 5.5 12 5.5 12 5.5s-5.92 0-7.683.379A3 3 0 0 0 2.2 8.001C2 9.762 2 12 2 12s0 2.239.2 3.999a3 3 0 0 0 2.118 2.122C6.08 18.5 12 18.5 12 18.5s5.92 0 7.683-.379A3 3 0 0 0 21.8 16C22 14.239 22 12 22 12s0-2.239-.2-3.999zM10 15.5V8.5L16 12l-6 3.5z' />
                    </svg>
                </div>
            </a>
            {/* Team Logos and Names Section */}
            <div className="absolute bottom-0 left-0 w-full flex justify-center items-center bg-white p-4">
                <div className="flex justify-between items-center w-full max-w-[320px]">
                    {/* Team One */}
                    <div className="flex items-center space-x-2">
                        <img
                            src='/path-to-team-one-logo.png'
                            alt={`${teamOne} Logo`}
                            className='w-8 h-8 object-cover'
                        />
                        <span className="text-sm font-bold text-[#111827]">{teamOne}</span>
                    </div>

                    {/* VS with Background */}
                    <div className="mx-4 bg-[#17356C] text-white py-1 px-3 font-bold text-lg">
                        VS
                    </div>

                    {/* Team Two */}
                    <div className="flex items-center space-x-2">
                        <span className="text-sm font-bold text-[#111827]">{teamTwo}</span>
                        <img
                            src='/path-to-team-two-logo.png'
                            alt={`${teamTwo} Logo`}
                            className='w-8 h-8 object-cover'
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HighlightsCard;
