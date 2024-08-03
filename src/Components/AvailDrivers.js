import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AvailDrivers.css";
import Header from "./Header";
import Footer from "./Footer";
import { useLocation } from "react-router-dom";
function AvailDrivers() {
  let navigate = useNavigate();
  const {state}=useLocation()
  console.log(state)
  const [startIndex, setStartIndex] = useState(0);
  const cardsPerPage = 3;
  const drivers = [
    {
      id: 1,
      title: "Keerthika reddy",
      contact: "1234567890",
      startLocation: "Ameerpet",
      seats: 1,
      Destination: "JP.Morgan Chase",
      description:
        "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
      image:
        "https://img.freepik.com/free-photo/portrait-beautiful-young-woman-standing-grey-wall_231208-10760.jpg?size=626&ext=jpg&ga=GA1.1.1292351815.1711584000&semt=ais",
      rating: {
        rate: 3.9,
      },
    },
    {
      id: 2,
      title: "Akshay Chowdary",
      contact: "9876543210",
      startLocation: "Kompally",
      seats: 2,
      Destination: "Bachupally-Rd",
      description:
        "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
      image:
        "https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?size=626&ext=jpg&ga=GA1.1.1687694167.1711670400&semt=sph",
      rating: {
        rate: 4.1,
      },
    },
    {
      id: 3,
      title: "Preethi Chowdary",
      contact: "1245678903",
      startLocation: "PragthiNagar",
      seats: 3,
      Destination: "Jubliee Hills",
      description:
        "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
      image:
        "https://t4.ftcdn.net/jpg/03/83/25/83/360_F_383258331_D8imaEMl8Q3lf7EKU2Pi78Cn0R7KkW9o.jpg",
      rating: {
        rate: 3.7,
      },
    },
    {
      id: 4,
      title: "Vandan Donkeshwara",
      contact: "2345678901",
      startLocation: "Alwal",
      seats: 2,
      Destination: "Banjara Hills",
      description:
        "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
      image:
        "https://img.freepik.com/free-photo/handsome-bearded-guy-posing-against-white-wall_273609-20597.jpg?size=626&ext=jpg&ga=GA1.1.1224184972.1711670400&semt=sph",
      rating: {
        rate: 4.5,
      },
    },
    {
      id: 5,
      title: "Anurag Sahu",
      contact: "3456789012",
      startLocation: "Kompally",
      seats: 1,
      Destination: "T-HUB,HYD",
      description:
        "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
      image:
        "https://sources.roboflow.com/dzuGOec8v6bRLhxo590fQ69a22N2/cNc6Q78185vhZDZhqEdS/original.jpg",
      rating: {
        rate: 3.5,
      },
    },
  ];

  const nextSet = () => {
    if (startIndex + cardsPerPage < state.length) {
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
      <div className="row mx-auto text-center " style={{ minHeight: "80vh" }}>
        <div className="row row-cols-1 row-cols-sm-1 row-cols-md-3 row-cols-lg-4 g-4 text-center m-auto m-2 p-2 d-flex justify-content-center">
          {state
            .slice(startIndex, startIndex + cardsPerPage)
            .map((state) => (
              <div
                className="col text-center justify-content-center gap-3"
                key={state._id}
    
              >
                <div
                  className={"card " + (startIndex > 0 ? "card-hidden" : "")}
                >
                  <div className="card-header">{state._id}</div>
                  <div className="card-body">
                    <img  alt={state._id} />
                    <p className="card-text p-2">
                      Start Location: {state.pickup}
                      <br />
                      Destination: {state.destination}
                      <br />
                      Seats: {state.noofseats}
                      <br />
                      Rating: {state.passengergender}
                    </p>
                  </div>
                  <div className="card-footer">
                    <button
                      className="btn btn-warning m-1 p-2"
                      onClick={() =>
                        navigate(
                          "/login/CarPool/UserRide/AvailableDrivers/Payment"
                        )
                      }
                    >
                      Confirm
                    </button>
                    <img
                      className="p-1"
                      src="data:image/png;base64,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"
                    ></img>
                    <img
                      className="p-1"
                      src="https://cdn-icons-png.flaticon.com/512/10070/10070434.png"
                    ></img>
                  </div>
                </div>
              </div>
            ))}
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
            disabled={startIndex + cardsPerPage >= state.length}
          >
            Next &gt;
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AvailDrivers;