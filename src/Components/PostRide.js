import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./cssFiles/PostRide.css";
import Reactmap from "./Reactmap";

function PostRide() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  let [data,setData]=useState([])
  const onSubmit = (data1) => {setData([data1.startLocation,data1.destination])
    console.log(data1);
  };

  return (
    <div className="d-flex">
      <div style={{ width: '50%' }}>
        <h1 className="pt-4 mx-auto text-center">Post a ride</h1>
        <form className="head w-75 mx-auto mt-5 mb-0" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-2">
            <label>
              <b>Number of seats:</b>
            </label>
            <input 
              type="number" 
              className="form-control" 
              {...register("seats", { required: true })} 
            />
            {errors.seats && <span className="text-danger">This field is required</span>}
          </div>

          <div className="mb-2">
            <label>
              <b>Phone No:</b>
            </label>
            <input 
              type="number" 
              className="form-control" 
              {...register("phone", { required: true })} 
            />
            {errors.phone && <span className="text-danger">This field is required</span>}
          </div>

          <div className="mb-2">
            <label>
              <b>Start location:</b>
            </label>
            <input 
              type="text" 
              className="form-control" 
              {...register("startLocation", { required: true })} 
            />
            {errors.startLocation && <span className="text-danger">This field is required</span>}
          </div>

          <div className="mb-2">
            <label>
              <b>Destination:</b>
            </label>
            <input 
              type="text" 
              className="form-control" 
              {...register("destination", { required: true })} 
            />
            {errors.destination && <span className="text-danger">This field is required</span>}
          </div>

          <div className="mb-2">
            <label>
              <b>Date of Ride:</b>
            </label>
            <input 
              type="date" 
              className="form-control" 
              {...register("date", { required: true })} 
            />
            {errors.date && <span className="text-danger">This field is required</span>}
          </div>

          <div className="mb-3">
            <label>
              <b>Time:</b>
            </label>
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
            <label>
              <b>Preferred passenger:</b>
            </label>
            <div className="form-check">
              <input
                type="radio"
                id="m"
                className="form-check-input"
                value="male"
                {...register("passenger", { required: true })}
              />
              <label className="form-check-label" htmlFor="m">Male</label>
            </div>
            <div className="form-check">
              <input
                type="radio"
                id="f"
                className="form-check-input"
                value="female"
                {...register("passenger", { required: true })}
              />
              <label className="form-check-label" htmlFor="f">Female</label>
            </div>
            {errors.passenger && <span className="text-danger">This field is required</span>}
          </div>

          <button type="submit" className="btn btn-warning">
            Post Ride
          </button>
        </form>
      </div>
      <Reactmap formdata={data} />
    </div>
  );
}

export default PostRide;
