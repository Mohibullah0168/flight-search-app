import React from 'react';
import { IoIosNotificationsOutline } from "react-icons/io";
import { FaRegUserCircle } from "react-icons/fa";

function Navbar() {
  return (
    <div className="w-full h-12 bg-slate-800 text-slate-300 flex justify-between items-center text-xs">
      <div className='flex items-center gap-8  ml-40'>
        <p>Dashboard</p>
        <p>Master Price</p>
        <p>Custom Price</p>
        <p>Calendar</p>
        <p>Reports</p>
      </div>

      <div className='flex gap-2 text-lg items-center mr-36'>
        <div>
          <IoIosNotificationsOutline/>
        </div>
        <div className='text-2xl'>
          <FaRegUserCircle/>
        </div>
      </div>
    </div>
  );
}

export default Navbar;