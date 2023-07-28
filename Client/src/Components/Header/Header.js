import React, { useRef, useEffect } from "react";
import "./Header.css";

const Header = (props) => {
  const resultRef = useRef();
  const expressionRef = useRef();

  useEffect(() => {
    resultRef.current.scrollIntoView();
  }, [props.history]);

  useEffect(() => {
    expressionRef.current.scrollLeft = expressionRef.current.scrollWidth;
  }, [props.expression]);

  const options = {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  return (
    <div className="header custom-scroll">
      <div className="result_section">
        <p onClick={() => props.handleKeyPress(8, "backspace")}>⌦</p>
        <p ref={resultRef} className="result">
          {props.result}
        </p>
      </div>

      <div ref={expressionRef} className="expression custom-scroll">
        <p>{props.expression}</p>
      </div>
      <div className="history">
        <div className="history-symbol">🕑 HISTORY</div>
        <div className="history-container">
          {props.history &&
            props.history?.map((item) => {
              let formattedDate = new Date(item?.createdAt).toLocaleString(
                "en-US",
                options
              );

              // Separate the time and AM/PM
              const [time, ampm] = formattedDate.split(" ");

              // Rearrange the format as desired
              formattedDate = `${ampm} ${time}`;
              return (
                <div
                  key={item + "" + Math.random() * 44}
                  className="history-items"
                >
                  <p>{item?.calculation}</p>
                  <p>{formattedDate}</p>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Header;
