import React from "react";
import FeaturedJobCards from "./FeaturedJobCards";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const FeaturedJobs = () => {
    const { allJobs } = useSelector((store) => store.job);
    const navigate = useNavigate();

    return (
        <div className="max-w-7xl mx-auto my-10 px-4 md:px-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center md:text-left">Featured Jobs</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {
                    allJobs.length <= 0 ? (
                        <span className="text-gray-600">No Job Available</span>
                    ) : (
                        allJobs.slice(0, 6).map((job) => <FeaturedJobCards key={job._id} job={job} />)
                    )
                }
            </div>
        </div>
    );
}

export default FeaturedJobs;
