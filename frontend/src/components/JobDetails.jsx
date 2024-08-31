import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import Navbar from "./global/Navbar";
import Footer from "./global/Footer";
import { useParams } from "react-router-dom";
import useGetSingleJob from "@/hooks/useGetSinglejob";
import {  APPLICATION_API_END_POINT, JOB_API_END_POINT } from "@/utils/notes";
import axios from "axios";
import { setSingleJob } from "@/redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const JobDetails = () => {
  const [applied, setApplied] = useState(false);
  const params = useParams();
  const jobID = params.id;
  const { singleJob } = useSelector((store) => store.job);
  const { User } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  useGetSingleJob(jobID);
  const applyForJob=async ()=>{
    try {
        const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobID}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          toast.success(res.data.message);
          setApplied(true); // Update the state to reflect the applied status
        } else {
          toast.error("Failed to apply for the job.");
        }
      } catch (error) {
        console.log("Error applying for the job:", error);
        toast.error(error.response?.data?.message || "Something went wrong");
      }
    };
  useEffect(() => {
    const getSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobID}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
        }
      } catch (error) {
        console.log(error);
      }
    };
    getSingleJob();

    // Determine if the user has already applied
    const isApplied =
      singleJob?.applications?.some(
        (application) => application.applicant === User?._id
      ) || false;
    setApplied(isApplied);
  }, [jobID, dispatch, singleJob, User?._id]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow py-10 px-5">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Job Details</h1>
          </div>
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              {singleJob?.title}
            </h2>
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                {singleJob?.position}
              </Badge>
              <Badge className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                {singleJob?.jobType}
              </Badge>
              <Badge className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                {singleJob?.salary} LPA
              </Badge>
            </div>
          </div>
          <div className="mb-2">
            {applied ? (
              <Button
                disabled
                className="bg-gray-500 text-white px-6 py-2 rounded-full text-base"
              >
                Already Applied
              </Button>
            ) : (
              <Button
                onClick={applyForJob}
                className="bg-red text-white px-6 py-2 rounded-full text-base"
              >
                Apply Now
              </Button>
            )}
          </div>
          <hr className="my-6" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Role</h3>
              <p className="text-gray-600">{singleJob?.title}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Location</h3>
              <p className="text-gray-600">{singleJob?.location}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Experience</h3>
              <p className="text-gray-600">{singleJob?.experience}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Salary</h3>
              <p className="text-gray-600">{singleJob?.salary} LPA</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Total Applicants
              </h3>
              <p className="text-gray-600">{singleJob?.applications?.length}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Posted Date
              </h3>
              <p className="text-gray-600">
                {singleJob?.createdAt.split("T")[0]}
              </p>
            </div>
          </div>
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Job Description
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {singleJob?.description}
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default JobDetails;
