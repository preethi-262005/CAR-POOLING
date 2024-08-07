import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import "./Home.css"
import { useNavigate } from "react-router-dom";
function Home2() {
  let navigate = useNavigate();
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
            onClick={() => navigate("/login/CarPool/UserRide")}
          >
            Have a Ride
          </button>
          <button
            className="btn2 p-3"
            onClick={() => navigate("/login/CarPool/DriverRide")}
          >
            Pool my Car
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home2;