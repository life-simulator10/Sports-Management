import React from 'react';

const Messagecard = ({ message }) => {
  const { firstName, lastName, email, phoneNo, message: messageContent, createdAt } = message;

  // Format the date (assuming createdAt is an ISO string)
  const formattedDate = new Date(createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="bg-[#4D4D4D] p-6 max-w-md mx-auto rounded-xl shadow-md space-y-4 text-white w-full md:w-[400px] lg:w-[350px] md:min-h-[400px]">
      {/* Date */}
      <div className="text-right text-sm text-gray-200">{formattedDate}</div>

      {/* Name */}
      <div className="bg-[#081526] py-2 text-center text-[#E6B737] text-lg font-bold rounded-md">
        {firstName} {lastName}
      </div>

      {/* Email and Phone */}
      <div className="bg-[#081526] py-2 text-center text-sm rounded-md">
        {email}, {phoneNo}
      </div>

      {/* Message */}
      <div className="bg-[#081526] p-4 rounded-md text-sm">
        {messageContent}
      </div>
    </div>
  );
};

export default Messagecard;
