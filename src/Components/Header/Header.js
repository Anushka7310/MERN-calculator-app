import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <div className="header custom-scroll">
      <div className="header_history">
        <p>1+2</p>
        <p>12+40</p>
        <p>400+500</p>
        <p>1+2</p>
        <p>12+40</p>
        <p>400+500</p>
        <p>1+2</p>
        <p>12+40</p>
        <p>400+500</p>
      </div>
      <div className="header_expression custom-scroll">
        <p>10+90+80</p>
      </div>
      <p className="header_result">149</p>
    </div>
  );
};

export default Header;
