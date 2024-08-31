import React, { useState, useEffect } from 'react';
import { FiSearch } from "react-icons/fi";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';

const Hero = () => {
  const [query, setQuery] = useState("");
  const [isImageVisible, setImageVisible] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setImageVisible(true); // Trigger the image to appear on component mount
  }, []);

  const searchHandler = (e) => {
    e.preventDefault();
    dispatch(setSearchedQuery(query));
    navigate("/search");
  };

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4 md:py-10 py-8 flex flex-col-reverse md:flex-row items-center justify-between gap-8">
      <div className="flex flex-col items-center md:items-start md:text-left text-center w-full">
        <h1 className="mt-4 md:mt-8 text-3xl sm:text-4xl md:text-5xl font-bold text-black mb-4 flex items-center justify-center md:justify-start gap-3">
          Find your{" "}
          <span className="text-4xl sm:text-4xl md:text-5xl font-bold text-red">
            new job
          </span>{" "}
          today
        </h1>
        <p className="text-base sm:text-lg text-gray-600 mb-6 md:mb-8">
          Explore thousands of job opportunities and take the next step in your
          career with ease.
        </p>
        <div className="flex flex-col md:flex-row gap-4 w-full max-w-lg mx-auto md:mx-0">
          <div className="flex items-center w-full relative">
            <FiSearch className="text-gray-400 ml-3 absolute left-2 w-5 h-5" />
            <input
              type="text"
              placeholder="Which role are you looking for?"
              onChange={(e) => setQuery(e.target.value)}
              className="block w-full bg-white py-3 pl-10 pr-4 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-base sm:leading-6 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-red"
            />
          </div>
          <button
            onClick={searchHandler}
            className="bg-red text-white font-semibold py-3 px-6 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red"
          >
            Search
          </button>
        </div>
      </div>
      <div className={`flex-shrink-0 transition-transform duration-1000 ease-in-out transform ${isImageVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'} w-full md:w-auto`}>
        <img
          src="/hero_img.png"
          alt="Illustration"
          className="w-full h-auto object-cover rounded-lg"
        />
      </div>
    </div>
  );
};

export default Hero;
