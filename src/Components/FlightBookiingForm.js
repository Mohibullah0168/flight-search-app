import React, { useState } from 'react';

function FlightBookingForm() {
  // State to track the selected button
  const [selectedButton, setSelectedButton] = useState(null);

  // Function to handle button click
  const handleButtonClick = (buttonName) => {
    setSelectedButton(buttonName);
  };

  return (
    <div>
      <div className='flex justify-center mt-5 p-10'>
        <button
          className={` border border-indigo-900 px-4 py-1 text-xs font-semibold   ${selectedButton === 'Round Trip' ? 'bg-indigo-900 text-white' : ''}`}
          onClick={() => handleButtonClick('Round Trip')}
        >
          Round Trip
        </button>
        <button
          className={`border border-indigo-900 px-4 py-1 text-xs font-semibold ${selectedButton === 'One Way' ? 'bg-indigo-900 text-white' : ''}`}
          onClick={() => handleButtonClick('One Way')}
        >
          One Way
        </button>
        <button
          className={` border border-indigo-900 px-4 py-1 text-xs font-semibold ${selectedButton === 'Multi City' ? 'bg-indigo-900 text-white' : ''}`}
          onClick={() => handleButtonClick('Multi City')}
        >
          Multi City
        </button>
      </div>
      
      
      
      

    </div>
  );
}

export default FlightBookingForm;
