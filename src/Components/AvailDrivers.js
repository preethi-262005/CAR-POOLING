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
  const [insertionId, setInsertionId] = useState(null);
  const [rideConfirmed, setRideConfirmed] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.post(
          "http://localhost:4000/driver-api/getdriver",
          state
        );

        console.log("Response Data:", res.data);

        if (res.data.message === "Drivers available") {
          setDrivers(res.data.payload);
          console.log("Drivers:", res.data.payload);
        } else {
          console.error("Unexpected response message:", res.data.message);
        }
      } catch (error) {
        console.error("Error fetching drivers:", error.message || error);
      }
    };

    fetchData();
  }, [state]);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        if (insertionId) {
          const res = await axios.get(
            `http://localhost:4000/driver-api/rideconfirmation/${insertionId}`
          );
          console.log(res.data.payload);
          if (res.data.message === "Ride confirmed") {
            setRideConfirmed(true);
          } else {
            setRideConfirmed(false);
          }
        }
      } catch (error) {
        console.log("Error fetching ride confirmation status:", error);
      }
    };

    // Poll every 5 seconds to check the status
    const interval = setInterval(() => {
      fetchStatus();
    }, 5000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [insertionId]);

  useEffect(() => {
    if (rideConfirmed) {
      navigate("/chat");
    }
  }, [rideConfirmed, navigate]);

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
      const response = await axios.post(
        "http://localhost:4000/driver-api/confirm",
        {
          driverId,
          state,
        }
      );
      console.log(response);

      if (response.data.message === "Confirmation successful") {
        setInsertionId(response.data.payload._id); // Capture the insertionId
      } else {
        console.error("Failed to confirm ride:", response.data.message);
      }
    } catch (error) {
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
                  <div className="card-header"><b>Driver Id:</b><br></br>{driver._id}</div>
                  <div className="card-body ">
                    <p className=" id10 card-text p-2 ">
                      Start Location: {driver.pickup}
                      <br />
                      Destination: {driver.destination}
                      <br />
                      Phoneno: {driver.phoneno}
                      <br />
                      Seats: {driver.noofseats}
                      <br />
                      DateOfRide: {driver.dateofride}
                      <br />
                      Time: {driver.time}
                      <br />
                      Gender: {driver.passengergender}
                    </p>
                  </div>
                  <div className="card-footer">
                    <button
                      className="btn btn-warning m-1 p-2"
                      onClick={() => handleConfirm(driver._id)}
                    >
                      Request
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
