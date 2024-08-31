import React, { useState } from "react";
import Navbar from "../global/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { RadioGroup } from "../ui/radio-group";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/notes";
import { toast } from "sonner";

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNo: "",
    password: "",
    role: "",
    file: "",
  });

  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Please wait...");
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNo", input.phoneNo);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      const response = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        withCredentials: true,
      });

      if (response.status >= 200 && response.status < 300) {
        toast.success(response.data.message, { id: toastId });
        navigate("/login");
      } else {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      console.error('Axios error:', error);
      toast.error(`Error occurred: ${error.response?.data?.message || error.message}`, { id: toastId });
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center px-4 py-8">
        <form onSubmit={submitHandler} className="w-full max-w-md border border-gray-200 rounded-md p-4 bg-white shadow-md">
          <h1 className="text-center text-2xl font-bold mb-6 text-red-600">Sign Up</h1>

          <div className="my-4">
            <Label htmlFor="fullname" className="text-gray-700">Full Name</Label>
            <Input
              type="text"
              id="fullname"
              name="fullname"
              value={input.fullname}
              onChange={changeEventHandler}
              placeholder="Enter name"
              className="border-gray-300"
              autoComplete="name"
            />
          </div>

          <div className="my-4">
            <Label htmlFor="email" className="text-gray-700">Email</Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={input.email}
              onChange={changeEventHandler}
              placeholder="Enter email"
              className="border-gray-300"
              autoComplete="email"
            />
          </div>

          <div className="my-2">
            <Label htmlFor="phoneNo" className="text-gray-700">Phone Number</Label>
            <Input
              type="text"
              id="phoneNo"
              name="phoneNo"
              value={input.phoneNo}
              onChange={changeEventHandler}
              placeholder="Enter phone number"
              autoComplete="tel"
            />
          </div>

          <div className="my-4">
            <Label htmlFor="password" className="text-gray-700">Password</Label>
            <Input
              type="password"
              id="password"
              name="password"
              value={input.password}
              onChange={changeEventHandler}
              placeholder="Enter password"
              className="border-gray-300"
              autoComplete="new-password"
            />
          </div>

          <div className="flex  md:flex-row items-center gap-6 my-6">
            <RadioGroup className="flex flex-col gap-4 md:flex-row md:gap-6">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  id="Student"
                  name="role"
                  value="Student"
                  checked={input.role === "Student"}
                  onChange={changeEventHandler}
                  style={{ accentColor: "red" }}
                  className="cursor-pointer"
                />
                <Label htmlFor="Student" className="text-gray-700">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  id="Recruiter"
                  name="role"
                  value="Recruiter"
                  checked={input.role === "Recruiter"}
                  onChange={changeEventHandler}
                  style={{ accentColor: "red" }}
                  className="cursor-pointer"
                />
                <Label htmlFor="Recruiter" className="text-gray-700">Recruiter</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="flex items-center gap-2 my-4">
            <Label htmlFor="file" className="text-gray-700">Profile Picture</Label>
            <Input
              id="file"
              accept="image/*"
              type="file"
              onChange={changeFileHandler}
              className="cursor-pointer border-gray-300"
            />
          </div>

          <div>
            <Button type="submit" className="bg-red w-full mt-3 text-white">Sign Up</Button>
          </div>

          <div className="text-center mt-4">
            <span className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-red hover:underline">Login</Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
