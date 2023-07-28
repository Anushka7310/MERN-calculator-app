import React, { useState, useEffect } from "react";
import Header from "./Components/Header/Header";
import axios from "axios";
import KeyPad from "./Components/KeyPad/KeyPad";
import "./App.css";

const usedKeyCodes = [
  48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 67, 96, 97, 98, 99, 100, 101, 102,
  103, 104, 105, 8, 13, 190, 187, 189, 191, 56, 111, 106, 107, 109,
];
const keys = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "-",
  "+",
  "*",
  "/",
  "C",
  "%",
  "backspace",
];

const symbol = {
  187: "+",
  189: "-",
  191: "/",
  16: "*",
};

function App() {
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState("");
  const [history, setHistory] = useState([]);
  useEffect(() => {
    axios
      .get("/api")
      .then((response) => {
        setHistory(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    const handleKeyDown = (event) => {
      const { keyCode } = event;
      const key = keys.find((k) => {
        if (k === "backspace") return keyCode === 8;
        return keyCode === k.charCodeAt(0);
      });
      handleKeyPress(keyCode, key);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [history]);

  const handleKeyPress = (keyCode, key) => {
    if (!keyCode || !usedKeyCodes.includes(keyCode)) return;

    if (key === "C") {
      setExpression("");
      setResult("");
      return;
    }

    if (keyCode === 8) {
      if (!expression) return;
      setExpression(expression.slice(0, -1));
      return;
    }

    if (symbol[keyCode]) {
      const lastChar = expression.slice(-1);
      if (Object.values(symbol).includes(lastChar) && lastChar === ".") return;
      setExpression(expression + symbol[keyCode]);
      return;
    }

    if (key === "." || keys.includes(key)) {
      if (key === "0" && expression.length === 0) return;
      const lastChar = expression.slice(-1);
      if (keys.includes(lastChar) && lastChar === ".") return;
      setExpression(expression + key);
      return;
    }

    if (keyCode === 13) {
      if (!expression) return;
      calculateResult(expression);

      axios
        .post("/api", {
          calculation: expression,
        })
        .then(() => {
          const tempHistory = [
            {
              calculation: expression,
              createdAt: new Date(),
            },
            ...history.slice(0, 20), // Limit history to the last 20 items
          ];
          setHistory(tempHistory);
        });

      return;
    }
  };

  const calculateResult = (exp) => {
    if (!exp) {
      setResult("");
      return;
    }
    const lastChar = exp.slice(-1);
    if (!keys.includes(lastChar)) exp = exp.slice(0, -1);

    const answer = eval(exp).toFixed(2) + "";
    setResult(answer);
    setExpression("");
  };

  useEffect(() => {
    localStorage.setItem("calculator-app-history", JSON.stringify(history));
  }, [history]);

  return (
    <div className="app" data-theme={"dark"}>
      <div className="app_calculator">
        <div className="history_panel">
          <Header
            expression={expression}
            result={result}
            history={history}
            handleKeyPress={handleKeyPress}
          />
        </div>
        <div>
          <KeyPad handleKeyPress={handleKeyPress} />
        </div>
      </div>
    </div>
  );
}

export default App;
