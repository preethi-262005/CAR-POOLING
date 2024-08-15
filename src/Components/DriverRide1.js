import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import "./DriverRide1.css";
import Reactmap from "./Reactmap";

function DriverRide1() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [mapData, setMapData] = useState([]);
  const navigate = useNavigate();
  const [err, setErr] = useState(null);

  const onSubmit = async (formData) => {
    setMapData([formData.pickup, formData.destination]); // Update map data
    try {
      const res1 = await axios.post('http://localhost:4000/driver-api/driver', formData);
      if (res1.data.message === 'New driver added') {
        navigate("/login/Carpool/DriverRide/AvailableUsers", { state: res1.data.payload.insertedId });
      }
    } catch (error) {
      console.error("Error during pooling:", error);
      setErr("An error occurred during pooling");
    }
  };

  return (
    <div className="d-flex">
      <div style={{ width: '50%' }}>
        <h1 className="pt-4 mx-auto text-center">Post a ride</h1>
        <form className="head w-75 mx-auto mt-5 mb-0" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-2">
            <label><b>Number of seats:</b></label>
            <input
              type="number"
              className="form-control"
              {...register("noofseats", { required: true })}
            />
            {errors.noofseats && <span className="text-danger">This field is required</span>}
          </div>

          <div className="mb-2">
            <label><b>Phone No:</b></label>
            <input
              type="number"
              className="form-control"
              {...register("phoneno", { required: true })}
            />
            {errors.phoneno && <span className="text-danger">This field is required</span>}
          </div>

          <div className="mb-2">
            <label><b>Start location:</b></label>
            <input
              type="text"
              className="form-control"
              {...register("pickup", { required: true })}
            />
            {errors.pickup && <span className="text-danger">This field is required</span>}
          </div>

          <div className="mb-2">
            <label><b>Destination:</b></label>
            <input
              type="text"
              className="form-control"
              {...register("destination", { required: true })}
            />
            {errors.destination && <span className="text-danger">This field is required</span>}
          </div>

          <div className="mb-2">
            <label><b>Date of Ride:</b></label>
            <input
              type="date"
              className="form-control"
              {...register("dateofride", { required: true })}
            />
            {errors.dateofride && <span className="text-danger">This field is required</span>}
          </div>

          <div className="mb-3">
            <label><b>Time:</b></label>
            <select
              className="form-select"
              {...register("time", { required: true })}
              defaultValue=""
            >
              <option value="" disabled>Choose option</option>
              <option value="8AM-12PM">8AM-12PM</option>
              <option value="12PM-5PM">12PM-5PM</option>
              <option value="5PM-12AM">5PM-12AM</option>
            </select>
            {errors.time && <span className="text-danger">This field is required</span>}
          </div>

          <div className="pb-3">
            <label><b>Preferred passenger:</b></label>
            <div className="form-check">
              <input
                type="radio"
                id="m"
                className="form-check-input"
                value="male"
                {...register("passengergender", { required: true })}
              />
              <label className="form-check-label" htmlFor="m">Male</label>
            </div>
            <div className="form-check">
              <input
                type="radio"
                id="f"
                className="form-check-input"
                value="female"
                {...register("passengergender", { required: true })}
              />
              <label className="form-check-label" htmlFor="f">Female</label>
            </div>
            {errors.passengergender && <span className="text-danger">This field is required</span>}
          </div>

          <button type="submit" className="btn btn-warning">
            Post Ride
          </button>
        </form>
        {err && <p className="text-danger mt-3">{err}</p>}
      </div>
      <Reactmap formdata={mapData} />
    </div>
  );
}

export default DriverRide1;
