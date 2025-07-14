import React from "react";
import { useNavigate } from "react-router-dom";

const InputBox = ({ firstName, lastName, setFirstName, setLastName }) => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/home");
  };

  return (
    <div className="h-screen w-screen bg-gray-900 flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="w-11/12 sm:w-2/3 md:w-1/3 bg-gray-700 border-2 border-white flex flex-col px-10 py-8 rounded-2xl gap-4 items-center"
      >
        <h1 className="text-3xl font-bold text-white">Welcome</h1>

        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="bg-black w-full p-3 rounded-md border-2 border-white text-white placeholder-white"
        />

        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="bg-black w-full p-3 rounded-md border-2 border-white text-white placeholder-white"
        />

        <button
          type="submit"
          className="bg-black text-white w-full py-3 rounded-md hover:bg-white hover:text-black transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default InputBox;
