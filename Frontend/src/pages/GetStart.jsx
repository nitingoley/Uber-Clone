import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { MdKeyboardDoubleArrowDown } from "react-icons/md";
import LocationPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmationVehicle from "../components/ConfirmationVehicle";
import LookingForDriver from "../components/LookingForDriver";
import WaitForDriver from "../components/WaitForDriver";

const GetStart = () => {
  const [pickup, setPickUp] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const vehiclepnl = useRef(null);
  const confrimRidePanelRef = useRef(null);
  const vehicleFoundRef = useRef(null);
  const waitingDriverRef = useRef(null);

  const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false);
  const [confrimRidePanel, setConfirmRidePanel] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [waitingDriver, setWaitingDriver] = useState(false);

  const sumbitHandler = (e) => {
    e.preventDefault();
  };

  // Location panel animation
  useGSAP(() => {
    if (panelOpen) {
      gsap.to(panelRef.current, {
        height: "70%",
        duration: 0.3,
      });
      gsap.to(panelCloseRef.current, {
        opacity: 1,
        duration: 0.3,
      });
    } else {
      gsap.to(panelRef.current, {
        height: "0%",
        duration: 0.3,
      });
      gsap.to(panelCloseRef.current, {
        opacity: 0,
        duration: 0.3,
      });
    }
  }, [panelOpen]);

  // Vehicle panel animation
  useGSAP(() => {
    if (vehiclePanelOpen) {
      gsap.to(vehiclepnl.current, {
        y: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    } else {
      gsap.to(vehiclepnl.current, {
        y: "100%",
        duration: 0.3,
        ease: "power2.in",
      });
    }
  }, [vehiclePanelOpen]);

  // Confirm Vehicle panel animation
  useGSAP(() => {
    if (confrimRidePanel) {
      gsap.to(confrimRidePanelRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(confrimRidePanelRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [confrimRidePanel]);

  //Looking Driver Vehicle panel animation
  useGSAP(() => {
    if (vehicleFound) {
      gsap.to(vehicleFoundRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(vehicleFoundRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [vehicleFound]); 



    //Looking Driver Vehicle panel animation
  useGSAP(() => {
    if (waitingDriver) {
      gsap.to(waitingDriverRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(waitingDriverRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [waitingDriver]);

  return (
    <div className="h-screen relative overflow-hidden">
      {/* Uber Logo */}
      <img
        className="w-16 absolute left-5 top-5 z-20"
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        alt="Uber Logo"
      />

      {/* Background Image */}
      <div className="w-screen h-screen">
        <img
          className="w-full h-full object-cover"
          src="https://www.vice.com/wp-content/uploads/sites/2/2022/10/1666721187017-screenshot-2022-10-25-at-122139-pm.png"
          alt="Map Background"
        />
      </div>

      {/* Main Content Panel */}
      <div className="flex flex-col justify-end h-screen absolute top-0 w-full z-30">
        <div className="h-[30%] p-5 bg-white relative">
          <h5
            className="absolute right-6 top-6 text-2xl opacity-0 cursor-pointer"
            onClick={() => setPanelOpen(false)}
            ref={panelCloseRef}
          >
            <MdKeyboardDoubleArrowDown />
          </h5>
          <h4 className="text-3xl font-semibold">Find your destination</h4>
          <form onSubmit={sumbitHandler}>
            <div className="line absolute h-16 w-1 top-[45%] left-10 bg-gray-900 rounded-full"></div>
            <input
              type="text"
              onClick={() => setPanelOpen(true)}
              placeholder="Add a pickup location"
              className="bg-[#eee] px-12 py-2 text-base rounded-lg mt-5 w-full"
              value={pickup}
              onChange={(e) => setPickUp(e.target.value)}
            />
            <input
              type="text"
              onClick={() => setPanelOpen(true)}
              placeholder="Add your destination"
              className="bg-[#eee] px-12 py-2 text-base rounded-lg mt-3 w-full"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
          </form>
        </div>
        <div className="bg-white h-0 overflow-hidden" ref={panelRef}>
          <LocationPanel
            setPanelOpen={setPanelOpen}
            setVehiclePanelOpen={setVehiclePanelOpen}
          />
        </div>
      </div>

      {/* Vehicle Selection Panel */}
      <div
        ref={vehiclepnl}
        className="fixed w-full z-40 bottom-0 bg-white px-3 py-6 rounded-t-3xl shadow-lg"
        style={{ transform: "translateY(100%)" }}
      >
        <VehiclePanel
          setConfirmRidePanel={setConfirmRidePanel}
          setVehiclePanelOpen={setVehiclePanelOpen}
        />
      </div>

      {/* Confrimation Vehicle  */}
      <div
        ref={confrimRidePanelRef}
        className="fixed w-full z-40 bottom-0 bg-white px-3 py-6 rounded-t-3xl shadow-lg"
        style={{ transform: "translateY(100%)" }}
      >
        <ConfirmationVehicle
          setConfirmRidePanel={setConfirmRidePanel}
          setVehicleFound={setVehicleFound}
        />
      </div>

      <div
        ref={vehicleFoundRef}
        className="fixed w-full z-40 bottom-0 bg-white px-3 py-6 rounded-t-3xl shadow-lg"
        style={{ transform: "translateY(100%)" }}
      >
        <LookingForDriver setVehicleFound={setVehicleFound} />
      </div>


       <div
        ref={waitingDriverRef}
        className="fixed w-full z-40 bottom-0 bg-white px-3 py-6 rounded-t-3xl shadow-lg"
         
      >
        <WaitForDriver waitingDriver={waitingDriver}  />
      </div>
    </div>
  );
};

export default GetStart;
