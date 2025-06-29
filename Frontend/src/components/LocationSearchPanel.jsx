import React from "react";
import { IoIosPin } from "react-icons/io";

const LocationPanel = ({ setPanelOpen, setVehiclePanelOpen }) => {
  // Hardcoded locations like Uber
  const locations = [
    "243005 Old city Bareilly, Uttar Pradesh Bareilly",
    "Connaught Place, New Delhi, Delhi",
    "MG Road, Bengaluru, Karnataka",
    "Bandra West, Mumbai, Maharashtra",
    "Park Street, Kolkata, West Bengal",
  ];

  const handleLocationClick = () => {
    setPanelOpen(false);
    setVehiclePanelOpen(true);
  };

  return (
    <div>
      {locations.map((location, index) => (
        <div  
          onClick={handleLocationClick}
          key={index} 
          className="flex gap-4 items-center p-3 rounded-xl border-white active:border-black my-4 justify-start hover:bg-gray-100 cursor-pointer transition-colors"
        >
          <div className="bg-[#eee] h-10 w-12 rounded-full flex items-center justify-center">
            <IoIosPin />
          </div>
          <h4 className="font-medium">{location}</h4>
        </div>
      ))}
    </div>
  );
};

export default LocationPanel;