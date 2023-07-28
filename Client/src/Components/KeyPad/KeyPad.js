import React from "react";
import "./KeyPad.css";

function KeyPad(props) {
  const keys = [
    {
      label: "C",
      keyCode: 67,
    },
    {
      label: "+/-",
      keyCode: 80,
      value: "changes spacing",
    },
    {
      label: "%",
      keyCode: 53,
      value: "modulos",
    },
    {
      label: "/",
      keyCode: 191,
      value: "slash",
    },
    {
      keyCode: 49,
      label: "1",
    },
    {
      keyCode: 50,
      label: "2",
    },
    {
      keyCode: 51,
      label: "3",
    },
    {
      label: "×",
      keyCode: 56,
      value: "*",
    },
    {
      keyCode: 52,
      label: "4",
    },
    {
      keyCode: 53,
      label: "5",
    },
    {
      keyCode: 54,
      label: "6",
    },
    {
      label: "﹣",
      keyCode: 109,
      value: "-",
    },
    {
      keyCode: 55,
      label: "7",
    },
    {
      keyCode: 56,
      label: "8",
    },
    {
      keyCode: 57,
      label: "9",
    },
    {
      label: "+",
      keyCode: 107,
      value: "+",
    },

    {
      keyCode: 48,
      label: "0",
    },
    {
      keyCode: 190,
      label: ".",
    },
    {
      keyCode: 13,
      label: "=",
    },
  ];

  return (
    <div className="keypad">
      <div className="keypad_keys">
        {keys.map((item, index) => (
          <p
            className={item.label === "0" && "wide"}
            onClick={() =>
              props.handleKeyPress(item.keyCode, item.value || item.label)
            }
            key={index}
          >
            {item.label}
          </p>
        ))}
      </div>
    </div>
  );
}

export default KeyPad;
