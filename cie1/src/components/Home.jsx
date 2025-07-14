import React, { useState, useEffect } from "react";
import DateTime from "./DateTime";

const Home = ({ name }) => {
  const [Excellent, setExcellent] = useState(0);
  const [Good, setGood] = useState(0);
  const [Average, setAverage] = useState(0);
  const [Poor, setPoor] = useState(0);
  const [participantCount, setParticipantCount] = useState(0);

  // Simulated Crowd Feedback
  useEffect(() => {
    const interval = setInterval(() => {
      const categories = ["Excellent", "Good", "Average", "Poor"];
      const randomCategory = categories[Math.floor(Math.random() * 4)];

      switch (randomCategory) {
        case "Excellent":
          setExcellent((prev) => prev + 1);
          break;
        case "Good":
          setGood((prev) => prev + 1);
          break;
        case "Average":
          setAverage((prev) => prev + 1);
          break;
        case "Poor":
          setPoor((prev) => prev + 1);
          break;
        default:
          break;
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleClick = (type) => {
    setParticipantCount((prev) => prev + 1);
    switch (type) {
      case "Excellent":
        setExcellent((prev) => prev + 1);
        break;
      case "Good":
        setGood((prev) => prev + 1);
        break;
      case "Average":
        setAverage((prev) => prev + 1);
        break;
      case "Poor":
        setPoor((prev) => prev + 1);
        break;
      default:
        break;
    }
  };

  const feedbacks = [
    { name: "Excellent", value: Excellent },
    { name: "Good", value: Good },
    { name: "Average", value: Average },
    { name: "Poor", value: Poor },
  ];

  return (
    <div className="h-full w-full p-6 bg-black text-white min-h-screen">
      <div className="mb-6">
        <DateTime />
      </div>

      <h1 className="text-center text-2xl font-bold mb-5">Welcome {name}</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
        {feedbacks.map((item, idx) => (
          <div key={idx} className="bg-white text-black shadow-lg p-4 rounded text-center">
            <button
              onClick={() => handleClick(item.name)}
              className="bg-black text-white hover:bg-gray-800 px-4 py-2 rounded mb-2"
            >
              {item.name}
            </button>
            <p className="mt-2 text-lg font-semibold">
              {item.name} Feedbacks:{" "}
              <span className="text-black font-bold">{item.value}</span>
            </p>
          </div>
        ))}
      </div>

      {/* Participant Counter */}
      <div className="bg-white text-black shadow-lg p-6 rounded text-center max-w-md mx-auto">
        <h3 className="text-xl font-semibold mb-2">👤 Your Feedback Count</h3>
        <p className="text-3xl font-bold mb-4">{participantCount}</p>
        <div className="flex flex-wrap gap-4 justify-center">
          <button
            onClick={() => setParticipantCount((prev) => prev + 1)}
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
          >
            Increment
          </button>
          <button
            onClick={() => setParticipantCount((prev) => (prev > 0 ? prev - 1 : 0))}
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
          >
            Decrement
          </button>
          <button
            onClick={() => setParticipantCount(0)}
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
          >
            Reset
          </button>
          <button
            onClick={() => setParticipantCount((prev) => prev + 5)}
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
          >
            +5
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
