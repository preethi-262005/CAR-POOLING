import React, { useState } from "react";
import "./Header.css";
import { useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { IconContext } from "react-icons/lib";
import { Link } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import { useSelector, useDispatch } from "react-redux";
import { resetState } from "../redux/slices/userLoginSlice";

function Header() {
  const { loginStatus } = useSelector((state) => state.userLogin);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [sidebar, setSidebar] = useState(false);

  const handleLogout = () => {
    // Dispatch the action to reset the user login state
    dispatch(resetState());
    // Perform any additional logout tasks (e.g., clearing local storage)
    // Navigate to the home page or login page after logout
    navigate("");
  };

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <div
      style={{ minHeight: "4vh", backgroundColor: "black" }}
      className="header-container"
    >
      <h1 className="logo">RIDESHIFT</h1>
      <div className="nav-links">
        {loginStatus ? (
          <>
            <a className="live" onClick={handleLogout}>
              Logout
            </a>
            <IconContext.Provider value={{ color: "#FFA500" }}>
              <div className="menu-icon">
                <FaBars onClick={showSidebar} />
              </div>
            </IconContext.Provider>
          </>
        ) : (
          <>
            <a className="live" onClick={() => navigate("/")}>
              Home
            </a>
            <a className="live">
              <img
                src="https://icones.pro/wp-content/uploads/2021/08/icone-d-avion-jaune.png"
                alt="Airport"
                onClick={() => navigate("/AirportHome")}
              />
            </a>
            <a className="live" onClick={() => navigate("/Register")}>
              Signup
            </a>
            <a className="live" onClick={() => navigate("/login")}>
              Login
            </a>
            <IconContext.Provider value={{ color: "#FFA500" }}>
              <div className="menu-icon">
                <FaBars onClick={showSidebar} />
              </div>
            </IconContext.Provider>
          </>
        )}
      </div>
      <IconContext.Provider value={{ color: "#fff" }}>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <AiOutlineClose />
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </div>
  );
}

export default Header;
