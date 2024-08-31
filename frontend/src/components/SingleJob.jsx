/* eslint-disable react/prop-types */
import React from "react";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { useNavigate } from "react-router-dom";
import { Badge } from "./ui/badge";

const SingleJob = ({job}) => {
  const navigate = useNavigate();


  const daysAgo = (createdAt) => {
    const currentDate = new Date(); // Get the current date
    const postedDate = new Date(createdAt); // Convert the MongoDB timestamp to a Date object
    const timeDifference = currentDate - postedDate; // Calculate the time difference in milliseconds
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
    
    if (daysDifference === 0) return "Posted today";
    if (daysDifference === 1) return "Posted 1 day ago";
    return `Posted ${daysDifference} days ago`;
  };
  
  // const jobID="awefsgbc12fdfv";
  return (
    <div className="p-6 bg-white rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300 ease-in-out">
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs text-gray-500">{daysAgo(job?.createdAt)}</p>
        <Button variant="outline" className="rounded-full" size="icon">
          <Bookmark />
        </Button>
      </div>
      <div className="flex items-center gap-3 mb-4">
        <Avatar className="w-12 h-12">
          <AvatarImage src={job?.company?.logo} />
        </Avatar>
        <div>
          <h1 className="text-xl font-semibold text-gray-800">{job?.company?.name}</h1>
          <p className="text-sm text-gray-600">India</p>
        </div>
      </div>
      <div className="mb-4">
        <h2 className="text-lg font-bold text-gray-900">{job?.title}</h2>
        <p className="text-sm text-gray-700">
          {job?.description}
        </p>
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
        <Badge className="text-blue-600 font-medium" variant="ghost">{job?.position} Positions</Badge>
        <Badge className="text-red-600 font-medium" variant="ghost">{job?.jobType}</Badge>
        <Badge className="text-purple-600 font-medium" variant="ghost">{job?.salary} LPA</Badge>
      </div>
      <div className="flex gap-3">
        <Button
          onClick={() => navigate(`/description/${job?._id}`)}
          variant="outline"
          className="flex-1"
        >
          Details
        </Button>
        <Button className="bg-red hover:bg-orange-600 text-white flex-1">
          Save For Later
        </Button>
      </div>
    </div>
  );
};

export default SingleJob;
