import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import InputBox from "./components/InputBox";
import { Routes, Route } from "react-router";
import Home from "./components/Home";

function App() {
  const [firstName,setFirstName] = useState("");
  const [lastName,setLastName] = useState("");

  return (
    <>
      <Routes>
        <Route path="/" element={<InputBox firstName={firstName} lastName={lastName} setFirstName={setFirstName} setLastName={setLastName} />}/>
        <Route path="/home" element={<Home name={firstName} />}/>
      </Routes>
    </>
  );
}

export default App;
