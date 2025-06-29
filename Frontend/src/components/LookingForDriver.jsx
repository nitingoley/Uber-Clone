import React from "react";
import { FaChevronDown, FaMapMarkerAlt } from "react-icons/fa";

const LookingForDriver = () => {
  return (
    <div>
      <h5
        className="p-1 text-center w-[93%] absolute top-0"
        onClick={() => {
          props.setVehicleFound(false);
        }}
      >
        <FaChevronDown />
      </h5>

      <h3 className="text-2xl font-semibold mb-5">Looking for a Driver</h3>

      <div className="flex justify-between flex-col items-center gap-3">
        <img
          className="h-20"
          src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg"
          alt=""
        />
      </div>
      <div className="w-full mt-5">
        <div className="flex items-center gap-5 p-3 border-b-2 border-gray-400">
          <FaMapMarkerAlt />
          <div>
            <h3 className="text-lg font-medium">Pickup Location</h3>
            <p className="text-sm text-gray-600">123 Main Street, Downtown</p>
          </div>
        </div>
        <div className="flex items-center gap-5 p-3 border-b-2 border-gray-400">
          <FaMapMarkerAlt />
          <div>
            <h3 className="text-lg font-medium">Dropoff Location</h3>
            <p className="text-sm text-gray-600">456 Elm Avenue, Uptown</p>
          </div>
        </div>
        <div className="flex items-center gap-5 p-3 ">
          <span className="text-lg font-bold">&#8377;</span>
          <div>
            <h3 className="text-lg font-medium">Estimated Fare</h3>
            <p className="text-sm text-gray-600">
              &#8377;120.00 - &#8377;160.00
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LookingForDriver;
