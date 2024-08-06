import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./AvailDrivers.css";
import Header from "./Header";
import Footer from "./Footer";
import axios from "axios";

function AvailDrivers() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [startIndex, setStartIndex] = useState(0);
  const cardsPerPage = 3;
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.post("http://localhost:4000/driver-api/getdriver", state);
        
        console.log('Response Data:', res.data); // Log the full response data
  
        if (res.data.message === "Drivers available") {
          setDrivers(res.data.payload); // Assuming payload contains the list of drivers
          console.log('Drivers:', res.data.payload);
        } else {
          console.error("Unexpected response message:", res.data.message);
        }
      } catch (error) {
        console.error("Error fetching drivers:", error.message || error);
      }
    };
  
    fetchData();
  }, [state]); // Add userObj to the dependency array if it might change
  
console.log(drivers)
  const nextSet = () => {
    if (startIndex + cardsPerPage < drivers.length) {
      setStartIndex(startIndex + cardsPerPage);
    }
  };

  const prevSet = () => {
    if (startIndex - cardsPerPage >= 0) {
      setStartIndex(startIndex - cardsPerPage);
    }
  };

  const handleConfirm = async (driverId) => {
    try {
      // Make an API call to confirm the ride
      const response = await axios.post(
        "http://localhost:4000/driver-api/confirm",
        {
          driverId,
          state,
        }
      );

      if (response.data.message === "Confirmation successful") {
        // Redirect to payment page or show a success message
        navigate("/login/CarPool/UserRide/AvailableDrivers/Payment", {
          state: { state, driverId },
          
        });
        console.log(state);
      } else {
        // Handle confirmation failure
        console.error("Failed to confirm ride:", response.data.message);
      }
    } catch (error) {
      // Handle any errors that occur during the request
      console.error("Error confirming ride:", error);
    }
  };

  return (
    <div>
      <Header />
      <div className="row mx-auto text-center" style={{ minHeight: "80vh" }}>
        <div className="row row-cols-1 row-cols-sm-1 row-cols-md-3 row-cols-lg-4 g-4 text-center m-auto m-2 p-2 d-flex justify-content-center">
          {drivers
            .slice(startIndex, startIndex + cardsPerPage)
            .map((driver) => (
              <div
                className="col text-center justify-content-center gap-3"
                key={driver._id}
              >
                <div className={"card " + (startIndex > 0 ? "card-hidden" : "")}>
                  <div className="card-header">{driver._id}</div>
                  <div className="card-body">
                    <img alt={driver._id} />
                    <p className="card-text p-2">
                      Start Location: {driver.pickup}
                      <br />
                      Destination: {driver.destination}
                      <br />
                      Seats: {driver.noofseats}
                      <br />
                      Rating: {driver.passengergender}
                    </p>
                  </div>
                  <div className="card-footer">
                    <button
                      className="btn btn-warning m-1 p-2"
                      onClick={() => handleConfirm(driver._id)}

                    >
                      Confirm
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
        <div className="col text-center">
          <button
            className="btn btn-warning m-1"
            onClick={prevSet}
            disabled={startIndex === 0}
          >
            &lt; Prev
          </button>
          <button
            className="btn btn-warning m-1"
            onClick={nextSet}
            disabled={startIndex + cardsPerPage >= drivers.length}
          >
            Next &gt;
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AvailDrivers;
