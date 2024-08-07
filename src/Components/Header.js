import React from "react";
import "./Header.css";
import { useNavigate } from "react-router-dom";
function Header() {
  let navigate = useNavigate();
  return (
    <div
      style={({ minHeight: "4vh" }, { backgroundColor: "black" })}
      className="p-3 d-flex"
    >
      <div>
        <h1 className="logo">RIDESHIFT</h1>
      </div>
      <div className="mx-5 d-flex justify-content-end gap-4">
        <a href="" className="live" onClick={() => navigate("/")}>
          Home
        </a>
        <a href="" className="live " onClick={() => navigate("/contact")}>
          ContactUs
        </a>
        <a href="" className="live"onClick={() => navigate("/about")}>
          About
        </a>

        <a href="" className="live">
          <img
            src="https://icones.pro/wp-content/uploads/2021/08/icone-d-avion-jaune.png"
            onClick={() => navigate("/AirportHome")}
          ></img>
        </a>
      </div>
    </div>
  );
}
export default Header;