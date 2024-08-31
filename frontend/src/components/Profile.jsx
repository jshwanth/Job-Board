import React, { useState } from "react";
import Navbar from "./global/Navbar";
import Footer from "./global/Footer";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobsTable from "./AppliedJobsTable";
import UpdateProfile from "./UpdateProfile";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/hooks/useGetAllAppliedJobs";

const Profile = () => {
  useGetAppliedJobs();
  const skills = ["HTML", "CSS", "JS"]; // Example skills data
  const isResume = true;
  const [open, setOpen] = useState(false);
  const { User } = useSelector(store => store.auth)

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow py-10 px-5">
        <div className="flex justify-center mb-10">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-4xl">
            <div className="flex">
              <div className="flex-shrink-0">
                <Avatar className="w-32 h-32 border-4 border-red-500">
                  <AvatarImage
                    src={User?.profile?.profilePhoto}
                    alt="profile"
                    className="rounded-full"
                  />
                </Avatar>
              </div>
              <div className="flex-grow ml-8">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h1 className="text-4xl font-semibold text-gray-800">{User?.fullname}</h1>
                    <p className="text-gray-600 text-sm mt-2">
                      {User?.profile.bio}
                    </p>
                  </div>
                  <Button onClick={() => setOpen(true)} className="bg-red  text-white rounded-full p-2 flex items-center">
                    <Pen className="w-5 h-5 mr-2" />
                    Edit Profile
                  </Button>
                </div>
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Mail className="w-6 h-6 text-gray-600" />
                    <span className="text-gray-800">{User?.email}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Contact className="w-6 h-6 text-gray-600" />
                    <span className="text-gray-800">{User?.phoneNo}</span>
                  </div>
                </div>
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">Skills</h2>
                  <div className="flex flex-wrap items-center gap-2">
                    {User?.profile.skills.length > 0 ? (
                      User?.profile.skills.map((item, index) => (
                        <Badge key={index} className="bg-slate-300 text-black px-3 py-1 rounded-full">
                          {item}
                        </Badge>
                      ))
                    ) : (
                      <span className="text-gray-500">N/A</span>
                    )}
                  </div>
                </div>
                <div className="mb-6">
                  <Label className="text-xl font-semibold text-gray-800">
                    {
                      isResume ? (
                        <a
                          href={User?.profile?.resume}
                          download
                          className='text-blue-500 w-full hover:underline cursor-pointer'
                        >
                          {User?.profile?.resumeOriginalName}
                        </a>
                      ) : (
                        <span>NA</span>
                      )
                    }
                  </Label>


                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Applied Jobs Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-4xl mx-auto">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Applied Jobs</h2>
          <AppliedJobsTable />
        </div>
        <UpdateProfile open={open} setOpen={setOpen} />
      </main>
      <Footer />
    </div>
  );
};

export default Profile;

