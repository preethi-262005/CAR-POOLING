import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import "./Home3.css";
import { useNavigate } from "react-router-dom";
function Home3() {
  let navigate = useNavigate();
  return (
    <div className="Home3">
      <Header />
      <div className="AirHome" style={{ minHeight: "100vh" }}>
        <h1 className="heading ">
          Fly without fear.
          <br />
        </h1>
        <div className="air">
          <button
            className="btn btn-light p-3"
            onClick={() => navigate("/AirportHome/Book")}
          >
            BookNow
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home3;