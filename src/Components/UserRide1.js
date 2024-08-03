import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UserRide.css";
import Header from "./Header";
import Footer from "./Footer";
import { useForm } from 'react-hook-form';
import axios from 'axios';

function UserRide1() {
  const { register, handleSubmit } = useForm();
  const [err, setErr] = useState('');
  const navigate = useNavigate();

  async function onSignUpFormSubmit(userObj) {
    try {
      const res = await axios.post('http://localhost:4000/driver-api/getdriver', userObj);
      if (res.data.message === 'Drivers available') {
        navigate("/login/Carpool/UserRide/AvailableDrivers",{state:res.data.payload});
        
      } else {
        setErr(res.data.message);
      }
    } catch (error) {
      console.error("Error during booking:", error);
      setErr("An error occurred during booking");
    }
  }

  return (
    <div className="page">
      <Header />
      <h1 className="pt-3 mx-auto text-center">Book a ride</h1>
      <div className="container mt-2 mb-5"> {/* Added mb-5 class */}
        <form className="head w-50 mx-auto mb-0" onSubmit={handleSubmit(onSignUpFormSubmit)}>
          {err && <p className="text-danger text-center">{err}</p>}
          <div className="mb-2">
            <label><b>Number of passengers:</b></label>
            <input type="text" className="form-control" {...register("noofpassengers")} />
          </div>
          <div className="mb-2">
            <label><b>Phone No:</b></label>
            <input type="number" className="form-control" {...register("phoneno")} />
          </div>
          <div className="mb-2">
            <label><b>Pick-up location:</b></label>
            <input type="text" className="form-control" {...register("pickup")} />
          </div>
          <div className="mb-2">
            <label><b>Destination:</b></label>
            <input type="text" className="form-control" {...register("destination")} />
          </div>
          <div className="mb-2">
            <label><b>Date of Ride:</b></label>
            <input type="date" className="form-control" {...register("dateofride")} />
          </div>
          <div className="mb-2">
            <label><b>Time:</b></label>
            <select className="form-select" {...register("time")} defaultValue="">
              <option value="" disabled>Choose option</option>
              <option value="8AM-12PM">8AM-12PM</option>
              <option value="12PM-5PM">12PM-5PM</option>
              <option value="5PM-12AM">5PM-12AM</option>
            </select>
          </div>
          <div className="mb-2">
            <label><b>Restrictions:</b></label>
            <textarea className="form-control" {...register("restrictions")}></textarea>
          </div>
          <div className="mb-2">
            <label><b>Preferred driver:</b></label>
            <div className="form-check">
              <input type="radio" id="m" className="form-check-input" value="male" {...register("drivergender")} />
              <label className="form-check-label" htmlFor="m">Male</label>
            </div>
            <div className="form-check">
              <input type="radio" id="f" className="form-check-input" value="female" {...register("drivergender")} />
              <label className="form-check-label" htmlFor="f">Female</label>
            </div>
          </div>
          <button type="submit" className="btn btn-warning w-100">Book Ride</button>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default UserRide1;
