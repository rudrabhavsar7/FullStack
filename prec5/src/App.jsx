import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Button from "./components/Button";

function App() {
  const [inputVal, setInputVal] = useState("0");

  const controls = ["/", "*", "+", "-", "DEL"];

  const Numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", ".", "="];

  return (
    <>
      <div className="container">
        <div className="main">
          <input
            type="text"
            value={inputVal}
            readOnly
          />
          <div className="controls">
            {controls.map((item, idx) => (
              <Button key={idx} text={item} bgColor={"red"} inputVal={inputVal} setInputVal={setInputVal} />
            ))}
          </div>
          <div className="numbers">
            {Numbers.map((item, idx) => (
              <Button key={idx} text={item} bgColor={"black"} inputVal={inputVal} setInputVal={setInputVal} />
            ))}
          </div>

        </div>
      </div>
    </>
  );
}

export default App;
