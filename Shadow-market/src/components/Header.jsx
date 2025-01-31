import { Link } from "react-router-dom";
import Search from "./Search";
import { useState, useEffect } from "react";

export default function Header({ cartItems }) {
  const [isMobile, setIsMobile] = useState(false);

  // Update screen size state
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize(); // Check initial size
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <nav className="navbar fixed-top row align-items-center ">
        <div className="col-3 text-center text-md-start">
          <div className="navbar-brand">
            <Link to={"/"}>
              <img className="logo" src="/images/logo1.png" alt="Logo" />
            </Link>
          </div>
        </div>

        {!isMobile && (
          <div className="col-6 d-flex justify-content-center">
            <div className="search-bar-wrapper">
              <Search />
            </div>
          </div>
        )}

        <div className="col-3 text-center text-md-end">
          <Link to={"/cart"} className="text-white">
            <span id="cart" className="ml-5 me-1">Cart</span>
            <span className="ml-1 me-3" id="cart_count">{cartItems.length}</span>
          </Link>
        </div>
      </nav>

      {/* Add padding to prevent content overlap */}
      <div style={{ paddingTop: "90px" }}>
        {/* Your page content goes here */}
      </div>
    </>
  );
}
