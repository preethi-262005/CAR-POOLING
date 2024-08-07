import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import "./Registeration.css";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useForm } from "react-hook-form";

function Registeration() {
  const [isDriver, setIsDriver] = useState(false);
  const { register, handleSubmit } = useForm();
  const [err, setErr] = useState('');
  const navigate = useNavigate();

  async function onSignUpFormSubmit(userObj) {
    const formData = new FormData();

    Object.keys(userObj).forEach(key => {
      formData.append(key, userObj[key]);
    });

    try {
      const res = await axios.post('http://localhost:4000/person-api/person', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (res.data.message === 'Person created') {
        navigate("/login");
      } else {
        setErr(res.data.message);
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setErr("An error occurred during registration");
    }
  }

  return (
    <div>
      <Header />
      <div className="text-center m-auto border-1 w-50 mt-5 mb-3 p-4 card-box-shadow">
        <div className="">
          <form className="w-75 mx-auto" onSubmit={handleSubmit(onSignUpFormSubmit)} encType="multipart/form-data">
            
            <div className="card-body">
            <h3 className="mb-3"> SIGN UP </h3>
              {err && <p className="text-danger text-center">{err}</p>}
              <input
                type="text"
                placeholder="First Name"
                className="form-control mb-3 w-100 p-2 rounded-input"
                {...register("firstname")}
              />
              <input
                type="text"
                placeholder="Last Name"
                className="form-control mb-3 p-2 rounded-input"
                {...register("lastname")}
              />
              <input
                type="email"
                placeholder="Email"
                className="form-control mb-3 p-2 rounded-input"
                {...register("email")}
              />
              <input
                type="password"
                placeholder="Password"
                className="form-control mb-3 p-2 rounded-input"
                {...register("password")}
              />
              <input
                type="date"
                placeholder="DOB"
                className="form-control mb-3 p-2 rounded-input"
                {...register("dateofbirth")}
              />
              <input
                type="tel"
                placeholder="Phone number"
                className="form-control mb-3 p-2 rounded-input"
                {...register("phoneno")}
              />
              <div className="mb-3 d-flex">
                <label className="text-dark mr-3 h6">Gender</label>
                <div className="mb-3 mx-3">
                  <input
                    type="radio"
                    id="male"
                    name="gender"
                    value="male"
                    className="form-check-input"
                    {...register("gender")}
                  />
                  <label htmlFor="male" className="form-check-label">
                    Male
                  </label>
                </div>
                <div className="mb-3">
                  <input
                    type="radio"
                    id="female"
                    name="gender"
                    value="female"
                    className="form-check-input"
                    {...register("gender")}
                  />
                  <label htmlFor="female" className="form-check-label">
                    Female
                  </label>
                </div>
              </div>
              <div className="mb-3">
                <label className="text-dark h6 mr-3">
                  Do you want to become a driver?
                </label>
                <div className="form-check form-check-inline">
                  <input
                    type="radio"
                    id="carpoolYes"
                    name="carpool"
                    value="yes"
                    className="form-check-input"
                    {...register("isdriver")}
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
              {isDriver && (
                <>
                  <label className="text-dark h6 mb-3">Car model</label>
                  <input
                    type="text"
                    placeholder="Car model"
                    className="form-control mb-3 p-2 rounded-input"
                    {...register("carmodel")}
                  />
                  <label className="text-dark h6 mb-3">Car number</label>
                  <input
                    type="tel"
                    placeholder="Car number"
                    className="form-control mb-3 p-2 rounded-input"
                    {...register("carnumber")}
                  />
                  <label className="text-dark h6 mb-3">Car photo</label>
                  <input
                    type="file"
                    placeholder="Upload car photo"
                    name="carphoto"
                    className="form-control p-2 mb-3 rounded-input"
                    {...register("carphoto")}
                  />
                  <label className="text-dark h6 mb-3">License</label>
                  <input
                    type="file"
                    placeholder="Upload license"
                    name="license"
                    className="form-control mb-3 p-2 rounded-input"
                    {...register("license")}
                  />
                  <label className="text-dark h6 mb-3">Aadhar Card</label>
                  <input
                    type="file"
                    placeholder="Upload aadhar card"
                    name="aadharcard"
                    className="form-control p-2 mb-3 rounded-input"
                    {...register("aadharcard")}
                  />
                  <label className="text-dark h6 mb-3">
                    Things that you do not want others to do in car [Restrictions]
                  </label>
                  <textarea
                    name="restrictions"
                    className="form-control mb-3 rounded-input"
                    {...register("restrictions")}
                  ></textarea>
                </>
              )}
              <button
                type="submit"
                className="btn btn-warning button-hover"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Registeration;
