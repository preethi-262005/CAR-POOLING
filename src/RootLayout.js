import { Outlet } from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";

function RootLayout() {
  return (
    <div>
      <Header />
      <div style={{ minHeight: "70vh" }}>
        <div className="container">
          {" "}
          <Outlet />
        </div>
      </div>
      <div >
        <Footer />
      </div>
    </div>
  );
}

export default RootLayout;