import React, { useState } from "react";

const DateTime = () => {
  const [date, setDate] = useState(new Date().toLocaleDateString());
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  setInterval(() => {
    setDate(new Date().toLocaleDateString());
    setTime(new Date().toLocaleTimeString());
  }, 500);

  return (
    <div className="text-white">
      <h1>Date : {date}</h1>
      <h1>Time : {time}</h1>
    </div>
  );
};

export default DateTime;
