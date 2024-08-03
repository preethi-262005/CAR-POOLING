import React from "react";
import "./Airport.css";
import Footer from "./Footer";
import Header from "./Header";
function Airport() {
  return (
    <div>
      <Header />
      <div className="page1" style={{ minHeight: "100vh" }}>
        <h1 className="pt-4 mx-auto text-center text-light">
          Stuck at an Airport?
        </h1>
        <h4 className="pt-4 mx-auto text-center text-light">
          Share a ride with fellow travellers!
        </h4>
        <form className="head w-50 mx-auto text-center mt-5 mb-0">
          <label>
            <b>Number of passengers:</b>
          </label>
          <input type="text" className="form-control mb-2" />

          <label>
            <b>Phone No:</b>
          </label>
          <input type="number" className="form-control mb-2" />

          <label>
            <b>Destination:</b>
          </label>
          <input type="text" className="form-control mb-2" />

          <label>
            <b>Time:</b>
          </label>
          <select id="" className="form-select mb-3" defaultValue="">
            <option value="" disabled>
              <placeholder>Choose option</placeholder>
            </option>
            <option value="select">8AM-12PM</option>
            <option value="select">12PM-5PM</option>
            <option value="select">5PM-12AM</option>
          </select>
          <label>
            <b>Restrictions:</b>
          </label>
          <textarea
            name="restrictions"
            className="form-control mb-3 rounded-input"
          ></textarea>

          <button type="submit" className="btn btn-warning">
            Ask for a Ride
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default Airport;