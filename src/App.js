import "./styles.css";
import Home from "./Components/Home";
import Home3 from "./Components/Home3";
import Login from "./Components/Login";
import Registeration from "./Components/Registeration";
import Home2 from "./Components/Home2";
import Airport from "./Components/Airport";
import UserRide1 from "./Components/UserRide1";
import AvailDrivers from "./Components/AvailDrivers";
import DriverRide1 from "./Components/DriverRide1";
import UserRide2 from "./Components/UserRide2";
import Payment from "./Components/Payment";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector } from "react-redux";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
export default function App() {
  const {currentUser}=useSelector((state)=>state.userLogin)
  let browserRouter = createBrowserRouter([
    {
      path: '',
      element: <Home />,
    },
    {
      path: "/AirportHome",
      element: <Home3 />,
    },
    {
      path: "/AirportHome/Book",
      element: <Airport />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/Register",
      element: <Registeration />,
    },
    {
      path: "/login/CarPool",
      element: <Home2 />,
    },
    {
      path: "/login/Carpool/UserRide",
      element: <UserRide1 />,
    },
    {
      path: "/login/Carpool/UserRide/AvailableDrivers",
      element: <AvailDrivers />,
    },
    {
      path: "/login/Carpool/DriverRide",
      element: <DriverRide1 />,
    },
    {
      path: "/login/CarPool/UserRide/AvailableDrivers/Payment",
      element: <Payment />,
    },
    {
      path: "/login/CarPool/UserRide/AvailableDrivers/UserRide2",
      element: <UserRide2 />,
    },
  ]);
  return (
    <div className="App">
      <RouterProvider router={browserRouter} />
    </div>
  );
}