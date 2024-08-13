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
import AvailUsers from "./Components/AvailUsers";
import Chat from "./Components/Chat";
import Contact from "./Components/Contact";
import Joinpage from "./Components/Joinpage";
import LastPage from "./Components/LastPage";
import Feedback from "./pages/Feedback";
import Logout from "./pages/Logout";
import Package from "./pages/Package";
import Profile from "./pages/Profile";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
export default function App() {
  const {currentUser}=useSelector((state)=>state.userLogin)
  let browserRouter = createBrowserRouter([
    
    {
      path:'/contact',
      element:<Contact/>

    },
    {
      path:'/profile',
      element:<Profile/>
    },
    {
      path:'/feedback',
      element:<Feedback/>
    },
    {
      path:'/package',
      element:<Package/>
    },
    {
      path:'/logout',
      element:<Logout/>
    },
    {
      path:'/about',
      element:<Joinpage/>
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
      path:"/chat",
      element: <Chat />,
    },
    {
      path: '',
      element: <Home2 />,
    },
    {
      path:'/home',
      element:<Home2/>
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
      path: "/login/Carpool/DriverRide/AvailableUsers",
      element:<AvailUsers/>
    },
    {
      path: "/payment",
      element: <Payment />,
    },
    {
      path: "/login/CarPool/UserRide/AvailableDrivers/UserRide2",
      element: <UserRide2 />,
    },
    {
      path:"/login/CarPool/UserRide/AvailableDrivers/UserRide2/last",
      element:<LastPage/>
    }
  ]);
  return (
    <div className="App">
      <RouterProvider router={browserRouter} />
    </div>
  );
}