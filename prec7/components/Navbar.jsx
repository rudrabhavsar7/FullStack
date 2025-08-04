import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-black fixed">
      {/* Hamburger Button */}
      <button
        className="text-white focus:outline-none fixed top-4 left-3 z-50 transition-all duration-300 ease-in-out"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Menu"
        aria-expanded={isOpen}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke={isOpen ? "white" : "black"}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
          />
        </svg>
      </button>

      {/* Navigation Links */}
      <div
        className={`${
          isOpen ? "flex" : "hidden"
        } flex-col w-screen h-screen justify-center items-start p-3 bg-black transition-all duration-300 ease-in-out gap-2`}
      >
        <Link
          to="/"
          className="text-white hover:text-gray-500 text-5xl flex items-center justify-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            fill="white"
            viewBox="0 0 24 24"
          >
            <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V9.5z" />
          </svg>
          Home
        </Link>
        <Link
          to="/about"
          className="text-white hover:text-gray-500 text-5xl flex items-center justify-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            fill="white"
            viewBox="0 0 24 24"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 4a1.5 1.5 0 110 3 1.5 1.5 0 010-3zm1 12h-2v-8h2v8z" />
          </svg>
          About
        </Link>
        <Link
          to="/contact"
          className="text-white hover:text-gray-500 text-5xl flex items-center justify-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            fill="white"
            viewBox="0 0 24 24"
          >
            <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24 11.36 11.36 0 003.56.57 1 1 0 011 1V20a1 1 0 01-1 1C10.61 21 3 13.39 3 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.22.2 2.4.57 3.56a1 1 0 01-.24 1.01l-2.21 2.22z" />
          </svg>
          Contact
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
