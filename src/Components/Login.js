import React,{useEffect} from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import {useForm} from "react-hook-form"
import {useDispatch,useSelector} from "react-redux"
import { userLoginThunk } from "../redux/slices/userLoginSlice";

function Login() {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  let { isPending,currentUser,errStatus,errMessage,loginStatus } = useSelector(state => state.userLogin);
  function onSignUpFormSubmit(data) {
    const actionObj=userLoginThunk(data)
    dispatch(actionObj);
  }
  
  useEffect(() => {
    console.log(currentUser)
    if (loginStatus === true) {
      navigate('/home')
    }
  }, [loginStatus, currentUser,navigate]);
  return (
    <div className="bro">
      <Header />
      <div className="login mx-auto m-5">
        <h1>Login</h1>
        <form className="mx-auto w-50 text-center" onSubmit={handleSubmit(onSignUpFormSubmit)} >
          <div className="input-box mx-auto">
          <input
              type="email"
              className="form-control "
              placeholder="email"
              {...register("email")}
            ></input>
            
          </div>
          <div className="input-box mx-auto">
            <input
              type="password"
              className="form-control "
              placeholder="password"
              {...register("password")}
            ></input>
          </div>
          <button
            type="submit"
            class="btn"
          >
            Login
          </button>
          <div class="register-link">
            <p>
              Don't have an account?{" "}
              <a href="#" class="href" onClick={() => navigate("/Register")}>
                Register
              </a>
            </p>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default Login;