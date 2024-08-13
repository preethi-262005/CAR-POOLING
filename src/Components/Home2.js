import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Home2() {
  let navigate = useNavigate();
  const { loginStatus } = useSelector((state) => state.userLogin);
  const [showAlert, setShowAlert] = useState(false);

  // Function to handle button click
  const handleButtonClick = (path) => {
    if (loginStatus) {
      navigate(path);
    } else {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000); // Hide alert after 3 seconds
    }
  };

  return (
    <div className="Home">
      <Header />
      <div className="divi" style={{ minHeight: "100vh" }}>
        <h1 className="heading">
          SHARE YOUR
          <br />
          <span>RIDE</span>
        </h1>
        <div className="buttons d-flex gap-4">
          <button
            className="btn1 p-3"
            onClick={() => handleButtonClick("/login/CarPool/UserRide")}
          >
            Have a Ride
          </button>
          <button
            className="btn2 p-3"
            onClick={() => handleButtonClick("/login/CarPool/DriverRide")}
          >
            Pool my Car
          </button>
        </div>
        {showAlert && (
          <div className="alert">
            <p>Login is required to proceed.</p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Home2;
