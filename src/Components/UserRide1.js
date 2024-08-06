import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UserRide.css";
import Header from "./Header";
import Footer from "./Footer";
import { useForm } from 'react-hook-form';
import axios from 'axios';
import userLoginSlice from "../redux/slices/userLoginSlice";
function UserRide1() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [err, setErr] = useState('');
  const navigate = useNavigate();

  async function onSignUpFormSubmit(userObj) {
    try {
      // Post user details
      const res1 = await axios.post('http://localhost:4000/user-api/user', userObj);

      if (res1.data.message === 'New user added') {
        // Fetch drivers
        console.log(userObj)
        navigate("/login/Carpool/UserRide/AvailableDrivers", { state: userObj });
      } else {
        setErr(res1.data.message);
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
      <div className="container mt-2 mb-5">
        <form className="head w-50 mx-auto mb-0" onSubmit={handleSubmit(onSignUpFormSubmit)}>
          {err && <p className="text-danger text-center">{err}</p>}
          <div className="mb-2">
            <label><b>Number of passengers:</b></label>
            <input 
              type="text" 
              className="form-control" 
              {...register("noofpassengers", { required: "Number of passengers is required" })} 
            />
            {errors.noofpassengers && <p className="text-danger">{errors.noofpassengers.message}</p>}
          </div>
          <div className="mb-2">
            <label><b>Phone No:</b></label>
            <input 
              type="number" 
              className="form-control" 
              {...register("phoneno", { required: "Phone number is required" })} 
            />
            {errors.phoneno && <p className="text-danger">{errors.phoneno.message}</p>}
          </div>
          <div className="mb-2">
            <label><b>Pick-up location:</b></label>
            <input 
              type="text" 
              className="form-control" 
              {...register("pickup", { required: "Pick-up location is required" })} 
            />
            {errors.pickup && <p className="text-danger">{errors.pickup.message}</p>}
          </div>
          <div className="mb-2">
            <label><b>Destination:</b></label>
            <input 
              type="text" 
              className="form-control" 
              {...register("destination", { required: "Destination is required" })} 
            />
            {errors.destination && <p className="text-danger">{errors.destination.message}</p>}
          </div>
          <div className="mb-2">
            <label><b>Date of Ride:</b></label>
            <input 
              type="date" 
              className="form-control" 
              {...register("dateofride", { required: "Date of ride is required" })} 
            />
            {errors.dateofride && <p className="text-danger">{errors.dateofride.message}</p>}
          </div>
          <div className="mb-2">
            <label><b>Time:</b></label>
            <select 
              className="form-select" 
              {...register("time", { required: "Time is required" })} 
              defaultValue=""
            >
              <option value="" disabled>Choose option</option>
              <option value="8AM-12PM">8AM-12PM</option>
              <option value="12PM-5PM">12PM-5PM</option>
              <option value="5PM-12AM">5PM-12AM</option>
            </select>
            {errors.time && <p className="text-danger">{errors.time.message}</p>}
          </div>
          <div className="mb-2">
            <label><b>Restrictions:</b></label>
            <textarea 
              className="form-control" 
              {...register("restrictions")} 
            />
          </div>
          <div className="mb-2">
            <label><b>Preferred driver:</b></label>
            <div className="form-check">
              <input 
                type="radio" 
                id="m" 
                className="form-check-input" 
                value="male" 
                {...register("drivergender", { required: "Preferred driver gender is required" })} 
              />
              <label className="form-check-label" htmlFor="m">Male</label>
            </div>
            <div className="form-check">
              <input 
                type="radio" 
                id="f" 
                className="form-check-input" 
                value="female" 
                {...register("drivergender", { required: "Preferred driver gender is required" })} 
              />
              <label className="form-check-label" htmlFor="f">Female</label>
            </div>
            {errors.drivergender && <p className="text-danger">{errors.drivergender.message}</p>}
          </div>
          <button type="submit" className="btn btn-warning w-100">Book Ride</button>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default UserRide1;
