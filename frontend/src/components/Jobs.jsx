import React from "react";
import Navbar from "./global/Navbar";
import FilterCard from "./FilterCard";
import SingleJob from "./SingleJob";
import Footer from "./global/Footer";
import { useSelector } from "react-redux";
import store from "@/redux/store";

// const jobsArray = [1, 2, 3, 4, 5, 6, 7];

const Jobs = () => {
  const { allJobs } = useSelector((store) => store.job);
  return (
    <div>
      <Navbar />
      {/* Job cards */}
      <div className="max-w-7xl mx-auto mt-5">
        <div className="flex gap-5">
          {/* <div className="w-full md:w-1/5">
            {" "}
            {/* Responsive width */}
            {/* <FilterCard /> */}
          {/* </div> }*/}
          {allJobs.length <= 0 ? (
            <span>No jobs found</span>
          ) : (
            <div className="flex-1 overflow-y-auto pb-5  ">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {" "}
                {/* Responsive grid */}
                {allJobs.map((job) => (
                  <div key={job?._id}>
                    {" "}
                    {/* Added key prop */}
                    <SingleJob job={job} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer /> {/* Added Footer component */}
    </div>
  );
};

export default Jobs;
