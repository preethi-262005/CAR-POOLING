import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./AvailUsers.css";
import Header from "./Header";
import Footer from "./Footer";
import { useEffect } from "react";
import axios from "axios";
function AvailUsers() {
  let navigate = useNavigate();
  let {state}=useLocation()
  const [startIndex, setStartIndex] = useState(0);
  const cardsPerPage = 3;
  const [users, setUsers] = useState([]);
  console.log(state)
  let vari={id:state}


  async function handleAccept(user){
    try{
   let res= await axios.put('http://localhost:4000/driver-api/accept',user)
   if(res.data.message=='accepted'){
    console.log("accepted")
   }
  }catch(error){
    console.log(error)
  }
    
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.post(
          "http://localhost:4000/driver-api/getuser",
          vari
        );
        if (res.data.message == "Users available") {
          setUsers(res.data.payload);
        }
        
        console.log(res.data.payload)
      } catch (error) {
        console.log(error);
      }
    };

    fetchData(); // Call fetchData inside useEffect
  },[state]); // Add
console.log(users)

  const nextSet = () => {
    if (startIndex + cardsPerPage < users.length) {
      setStartIndex(startIndex + cardsPerPage);
    }
  };

  const prevSet = () => {
    if (startIndex - cardsPerPage >= 0) {
      setStartIndex(startIndex - cardsPerPage);
    }
  };
 
 
  return (
    <div>
      <Header />
      <div className="row mx-auto text-center">
        <div className="row row-cols-1 row-cols-sm-1 row-cols-md-3 row-cols-lg-4 g-4 text-center m-auto m-2 p-2 d-flex justify-content-center">
          {users.length > 0 ? (
            users.slice(startIndex, startIndex + cardsPerPage).map((user) => (
              <div
                className="col text-center justify-content-center gap-3"
                key={user.state.phoneno}
              >
                <div className={"card " + (startIndex > 0 ? "card-hidden" : "")}>
                  <div className="card-header"><b>Phoneno:</b><br></br>{user.state.phoneno}</div>
                  <div className="card-body ">
                    <p className="id11 card-text p-2">
                      Start Location: {user.state.pickup}
                      <br />
                      Destination: {user.state.destination}
                      <br />
                      No of Passengers: {user.state.noofpassengers}
                      <br />
                      Gender: {user.state.drivergender}
                      <br />
                      DateOfRide: {user.state.dateofride}
                      <br />
                      Time: {user.state.time}
                      <br/>
                      Restrictions:{user.state.restrictions}
                    </p>
                  </div>
                  <div className="card-footer">
                  <button
  className="btn btn-warning m-1 p-2"
  onClick={() => handleAccept(user)} // Use an arrow function to pass the handler
>
  {user.status === false ? "Accept" : "Accepted"}
</button>

                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No users available</p>
          )}
        </div>
        <div className="col text-center">
          <button
            className="btn btn-warning m-1"
            onClick={prevSet}
            disabled={startIndex === 0}
          >
            &lt; Prev
          </button>
          <button
            className="btn btn-warning m-1"
            onClick={nextSet}
            disabled={startIndex + cardsPerPage >= users.length}
          >
            Next &gt;
          </button>
        </div>
        <div className="d-flex justify-content-center my-3">
          <button className="btn btn-warning p-3"onClick={() =>
                        navigate("/chat")
                      }>Start the ride</button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AvailUsers;