import React from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <>
      <header className="navbar">
        <h2 className="heading">📓 V-Notes </h2>
        <div className="navigation">
          <h2 className="navBtns">Home</h2>
          <h2 className="navBtns">Saved Notes</h2>   
        </div>
      </header>
      
    </>
  );
};

export default Navbar;
