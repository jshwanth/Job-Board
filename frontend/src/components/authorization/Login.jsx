import React, { useState } from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../global/Navbar';
import { RadioGroup } from '../ui/radio-group';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/notes';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '@/redux/authSlice';

const Login = () => {
  const [input, setInput] = useState({
    email: '',
    password: '',
    role: '',
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { User = {} } = useSelector((state) => state.auth || {});

  const changeEventHandler = (event) => {
    setInput({ ...input, [event.target.name]: event.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Please wait...");
    try {
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: { 'Content-Type': "application/json" },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(res.data.User));
        navigate("/");
        toast.success(res.data.message, { id: toastId });
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message, { id: toastId });
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center px-4 py-8">
        <form onSubmit={submitHandler} className="w-full max-w-md border border-gray-200 rounded-md p-4 bg-white">
          <h1 className="text-center text-2xl font-bold mb-5">Login</h1>
          <div className="my-4">
            <Label className="text-gray-700">Email</Label>
            <Input
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="Enter email"
              className="border-gray-300"
            />
          </div>
          <div className="my-4">
            <Label className="text-gray-700">Password</Label>
            <Input
              type="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder="Enter password"
              className="border-gray-300"
            />
          </div>
          <div className="flex items-center justify-between">
            <RadioGroup className="flex flex-col md:flex-row gap-4 my-6">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="Student"
                  checked={input.role === 'Student'}
                  onChange={changeEventHandler}
                  style={{ accentColor: "red" }} // Red radio button color
                  className="cursor-pointer"
                />
                <Label htmlFor="r1" className="text-gray-700">
                  Student
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="Recruiter"
                  checked={input.role === 'Recruiter'}
                  onChange={changeEventHandler}
                  style={{ accentColor: "red" }} // Red radio button color
                  className="cursor-pointer"
                />
                <Label htmlFor="r2" className="text-gray-700">
                  Recruiter
                </Label>
              </div>
            </RadioGroup>
          </div>
          <Button type="submit" className="w-full bg-red text-white my-4">
            Login
          </Button>
          <span className="text-sm">
            Do not have an account?{' '}
            <Link to="/signup" className="text-red hover:underline">Sign Up</Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
