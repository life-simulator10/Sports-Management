import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ title, className, ...props }) => {
  return (
    <div>
      <button
        className={`
          mt-6 lg:min-h-[55px] min-w-[223px]  bg-[#0B1933] text-white text-[17px] hover:bg-blue-500
          font-semibold hover:text-white py-2 px-4 border border-transparent border-2
          hover:border-blue-700 rounded ${className} 
        `}
        style={{
          background: 'linear-gradient(169deg, #0D1E3D 50%, #0A1830 50%)',
        }}
        {...props}
      >
        {title}
      </button>
    </div>
  );
};

Button.propTypes = {
  title: PropTypes.string,
  className: PropTypes.string,
};

Button.defaultProps = {
  title: "Button here",
  className: "",
};

export default Button;