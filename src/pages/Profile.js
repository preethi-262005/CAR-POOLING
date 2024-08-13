import React from 'react';
import { useSelector } from 'react-redux';
import './Profile.css';
import { useNavigate } from 'react-router-dom';
function Profile() {
  const { currentUser } = useSelector((state) => state.userLogin);
let navigate =useNavigate()
  // Debugging log
  console.log('Current User:', currentUser);
  console.log('Is Driver:', currentUser?.isdriver);

  return (
    <div className="profile1">
      <div className="container mt-4 mb-4 p-3 d-flex justify-content-center">
        <div className="card p-4">
          <div className="image d-flex flex-column justify-content-center align-items-center">
            <button className="btn">
              <img
                className="w-75 h-75 m-3"
                src="https://static.vecteezy.com/system/resources/previews/007/409/979/original/people-icon-design-avatar-icon-person-icons-people-icons-are-set-in-trendy-flat-style-user-icon-set-vector.jpg"
                height="100"
                width="100"
                alt="Profile"
              />
            </button>
            <span className="name mt-3">
              {currentUser?.firstname} {currentUser?.lastname}
            </span>
            <span className="idd">{currentUser?.email}</span>
            <span className="name mt-3">Phone No: {currentUser?.phoneno}</span>
            <span className="name mt-3">DOB: {currentUser?.dateofbirth}</span>
            <span className="name mt-3">Gender: {currentUser?.gender}</span>
            
            {/* Conditionally render car details if isDriver is 'yes' */}
            {currentUser?.isdriver === "yes" && (
              <>
                <span className="name mt-3">Car Model: {currentUser?.carmodel}</span>
                <span className="name mt-3">Car Number: {currentUser?.carnumber}</span>
                <span className="name mt-3">Restrictions: {currentUser?.restrictions}</span>
                
              </>
            )}

            <div className="d-flex mt-2">
              <button className="btn1 btn-dark" onClick={()=> navigate('/Register')}>Edit Profile</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
