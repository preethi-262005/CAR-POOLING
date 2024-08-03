import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
function UserRide2() {
  const [isDriver, setIsDriver] = useState(false);
  return (
    <div className="mx-auto">
      <Header />
      <h2 className="pt-4 text-center">Driver Feedback</h2>
      <form className="head w-50 mx-auto mt-5 mb-0">
        <div>
          <label className="text-dark h6 mb-6">Rate the driver:</label>
          <select id="rating" className="form-select mb-2" defaultValue="">
            <option value="" disabled>
              Select rating
            </option>
            <option value="5">5 - Excellent</option>
            <option value="4">4 - Very Good</option>
            <option value="3">3 - Good</option>
            <option value="2">2 - Fair</option>
            <option value="1">1 - Poor</option>
          </select>
        </div>

        <div>
          <label className="text-dark h6 mb-6">Feedback:</label>
          <textarea id="feedback " className="form-control mb-2" />
        </div>
        <div className="mb-3">
          <label className="text-dark h6 mr-3">
            Do you want to book a package with this driver?
          </label>
          <div className="form-check form-check-inline">
            <input
              type="radio"
              id="carpoolYes"
              name="carpool"
              value="yes"
              className="form-check-input"
              onClick={() => setIsDriver(true)}
            />
            <label htmlFor="carpoolYes" className="form-check-label">
              Yes
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              type="radio"
              id="carpoolNo"
              name="carpool"
              value="no"
              className="form-check-input"
              onClick={() => setIsDriver(false)}
            />
            <label htmlFor="carpoolNo" className="form-check-label">
              No
            </label>
          </div>
        </div>
        {isDriver ? (
          <>
            <label className="text-dark h6 mb-3">Pick-up location:</label>
            <input
              type="text"
              placeholder="Pick-up location"
              className="form-control mb-3 p-2 rounded-input"
            />
            <label className="text-dark h6 mb-3">Destination:</label>
            <input
              type="text"
              placeholder="Destination"
              className="form-control mb-3 p-2 rounded-input"
            />
            <label className="text-dark h6 mb-3">Package Duration:</label>
            <input
              type="text"
              placeholder="Duration"
              className="form-control p-2 mb-3 rounded-input"
            />
            <label className="text-dark h6 mb-3">Restrictions:</label>
            <textarea
              name="restrictions"
              className="form-control mb-3 rounded-input"
            ></textarea>
            <button type="submit" className="btn btn-warning">
              Confirm
            </button>
          </>
        ) : (
          <button type="submit" className="btn btn-warning mx-auto">
            Submit
          </button>
        )}
      </form>
      <Footer />
    </div>
  );
}

export default UserRide2;