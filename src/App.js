import React, { useState } from 'react';
import Navbar from './Components/Navbar';
import FlightBookingForm from './Components/FlightBookiingForm';
import flightData from './Components/data/flights.json';

const App = () => {
  // State variables for managing user input and filtered flight offers
  const [currentLocation, setCurrentLocation] = useState('');
  const [arrivalLocation, setArrivalLocation] = useState('');
  const [date, setDate] = useState('');
  const [filteredOffers, setFilteredOffers] = useState([]);
  
  // Function to filter flight offers based on user input
  const filterOffers = () => {
    const filtered = flightData.flightOffer.filter(offer => {
      const segments = offer.itineraries[0].segments;
      const departureMatch = segments.some(segment => segment.departure.iataCode === currentLocation);
      const arrivalMatch = segments.some(segment => segment.arrival.iataCode === arrivalLocation);
      const dateMatch = offer.itineraries[0].segments[0].departure.at.includes(date);
      return departureMatch && arrivalMatch && dateMatch;
    });
    // Update filteredOffers state with the filtered results
    setFilteredOffers(filtered);
  };

  return (
    
      <div>
        <Navbar />  
        <FlightBookingForm />

        {/* User input section for flight search */}
        <div className='h-14 w-[80%] border-y border-x-0 mx-40 border border-indigo-900 flex'>
          <div className='flex item-center m-2 border-slate-700 border rounded-sm'>
            <input className="ml-3 w-40 outline-none" type="text"
              placeholder="From"
              value={currentLocation}
              onChange={e => setCurrentLocation(e.target.value.toUpperCase())}
            />
          </div>
          <div className='flex item-center m-2 border-slate-700 border rounded-sm'>
            <input
              type="text"
              placeholder="To"
              value={arrivalLocation}
              onChange={e => setArrivalLocation(e.target.value.toUpperCase())}
              className="ml-3 w-40 outline-none"
            />
          </div>
          <div className='flex item-center m-2 border-slate-700 border rounded-sm'>
            <input
              type="date"
              value={date}
              onChange={e => setDate(e.target.value)}
              className="ml-3 w-40 outline-none"
            />
          </div>
          <div className='flex item-center m-2 border-slate-700 border rounded-sm'>
            <label className='flex items-center m-2'>Day-</label>
            <select className='ml-3 w-10 outline-none'>
              {["", 1, 2, 3, 4, 5, 6].map((key) => (
                <option key={key} value={key}>{key}</option>
              ))}
            </select>
          </div>
          <div className='flex item-center m-2 border-slate-700 border rounded-sm'>
            <label className='flex items-center m-2'>Day+</label>
            <select className='ml-3 w-10 outline-none'>
              {["", 1, 2, 3, 4, 5, 6].map((key) => (
                <option key={key} value={key}>{key}</option>
              ))}
            </select>
          </div>
          <div className='flex item-center m-2 border-slate-700 border rounded-sm'>
            <label className='flex items-center m-2'>Any time</label>
            <select className='ml-3 w-30 outline-none'>
              {["", 'Morning', 'Evening', 'Night'].map((key) => (
                <option key={key} value={key}>{key}</option>
              ))}
            </select>
          </div>
          <p className='flex items-center font-medium text-2xl ml-4'>+</p>
          <div className='flex item-center m-2 border-slate-700 border rounded-sm'>
            <label className='flex items-center m-2'>ADT</label>
            <select className='ml-3 w-30 outline-none'>
              {["", 'Dummy1', 'Dummy2', 'Dummy3'].map((key) => (
                <option key={key} value={key}>{key}</option>
              ))}
            </select>
          </div>
          <div className='flex item-center m-2 border-slate-700 border rounded-sm'>
            <label className='flex items-center m-2'></label>
            <select className='ml-3 w-32 outline-none'>
              {["", 1, 2, 3, 4, 5].map((key) => (
                <option key={key} value={key}>{key}</option>
              ))}
            </select>
          </div>
          <p className='flex items-center font-medium text-2xl'>+</p>
          
        </div>
        
        
        
        <div className='h-14 w-[80%] border-t-[0] border-x-0 mx-40 border border-indigo-900 flex items-center justify-between' >
          <div>
            <input type="checkbox" id="checkbox" name="checkbox" />
            <label htmlFor="checkbox">Extra Options</label>
          </div>
          <div className='flex gap-2'>
            <p>Environment</p>
            <input type="radio" name="environment" value="dummy" />
            <label htmlFor="dummy">Dummy</label>
            <input type="radio" name="environment" value="pdt" />
            <label htmlFor="pdt">PDT</label>
          </div>
          
          {/* Button to trigger flight search */}
          <button onClick={filterOffers} className="bg-indigo-900 text-white py-2 px-4 rounded-md flex items-center m-2">
            Search
          </button>
        </div>
        <>
        <div className={`SuccessfulMsg h-14 mt-2 ml-40 ${filteredOffers.length === 0 ? 'hidden' : ''}  `}>{flightData.message}</div>
        </>
       
        
        <div>
        {/* Display filtered flight offers in a table */}
        <table className={`w-[80%] ml-40 ${filteredOffers.length === 0 ? 'hidden' : ''}`}>
        <thead className="bg-gray-200">
          <tr>
            <th className="py-2 px-4">Flight</th>
            <th className="py-2 px-4">Aircraft</th>
            <th className="py-2 px-4">Class</th>
            <th className="py-2 px-4">Fare</th>
            <th className="py-2 px-4">Route</th>
            <th className="py-2 px-4">Departure</th>
            <th className="py-2 px-4">Arrival</th>
            <th className="py-2 px-4">Duration</th>
            <th className="py-2 px-4">Price</th>
            <th className="py-2 px-4">Action</th>
            
          </tr>
        </thead>
        <tbody>
          {filteredOffers.map((offer, index) => (
            offer.itineraries[0].segments.map((segment, segmentIndex) => (
              <tr key={`${index}-${segmentIndex}`} className={index % 2 === 0 ? 'bg-red-200' : 'bg-white'}>
                {segmentIndex === 0 && (
                  <>
                    <td className="py-2 px-4">{offer.itineraries[0].segments[0].flightNumber}</td>
                    <td className="py-2 px-4">{offer.itineraries[0].segments[0].aircraft}</td>
                    <td className="py-2 px-4">{offer.class[0]}</td>
                    <td className="py-2 px-4">{offer.fareBasis[0]}</td>
                    <td className="py-2 px-4">{`${offer.itineraries[0].segments[0].departure.iataCode} - ${offer.itineraries[0].segments[1].arrival.iataCode}`}</td>
                    <td className="py-2 px-4">{offer.itineraries[0].segments[0].departure.at}</td>
                    <td className="py-2 px-4">{offer.itineraries[0].segments[1].arrival.at}</td>
                    <td className="py-2 px-4">{offer.itineraries[0].duration}</td>
                    <td className="py-2 px-4">{offer.price}</td>
                    <td className="py-2 px-4"><button className='bg-indigo-900 text-white py-1 px-2 rounded-md flex items-center '>Select</button></td>
                  </>
                )}
                {segmentIndex !== 0 && (
                  <>
                    <td className="py-2 px-4">{segment.flightNumber}</td>
                    <td className="py-2 px-4">{segment.aircraft}</td>
                    <td className="py-2 px-4">{offer.class[0]}</td>
                    <td className="py-2 px-4">{offer.fareBasis[0]}</td>
                    <td className="py-2 px-4">{`${segment.departure.iataCode} - ${segment.arrival.iataCode}`}</td>
                    <td className="py-2 px-4">{segment.departure.at}</td>
                    <td className="py-2 px-4">{segment.arrival.at}</td>
                    <td className="py-2 px-4"></td>
                    <td className="py-2 px-4"></td>
                    <td className="py-2 px-4"></td>
                    
                  </>
                )}
              </tr>
            ))
          ))}
        </tbody>
      </table>
    </div>



      </div>
    
  );
};

export default App;