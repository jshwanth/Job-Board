import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { FaUser } from "react-icons/fa";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { setUser } from "@/redux/authSlice";
import { USER_API_END_POINT } from "@/utils/notes";
import axios from "axios";

const Navbar = () => {
  const { User } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="container mx-auto flex items-center justify-between px-4 py-3">
      {/* Logo and Title */}
      <div className="flex items-center space-x-2">
        <img
          src="/logo.png"
          alt="logo"
          className="h-16 w-16 md:h-40 md:w-40"
        />
        <h1 className="text-2xl ml-28 md:text-3xl font-bold text-black">
          Job<span className="text-red">Board</span>
        </h1>
      </div>

      {/* Navigation Links */}
      <div className="hidden md:flex flex-1 justify-center">
        <ul className="flex gap-4 md:gap-8 text-[#4B4B4B] font-semibold text-sm md:text-lg">
          {User && User.role === "Recruiter" ? (
            <>
              <li>
                <Link to="/admin/companies" className="hover:text-red">
                  Companies
                </Link>
              </li>
              <li>
                <Link to="/admin/jobs" className="hover:text-red">
                  Jobs
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/" className="hover:text-red">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/jobs" className="hover:text-red">
                  Jobs
                </Link>
              </li>
              <li>
                <Link to="/search" className="hover:text-red">
                  Search for a Job
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>

      {/* Auth Buttons or User Profile */}
      <div className="flex items-center space-x-2">
        {!User ? (
          <>
            <Link to="/login">
              <Button variant="outline" size="lg">
                Login
              </Button>
            </Link>
            <Link to="/signup">
              <Button className="bg-red text-white text-sm py-2 px-4 md:text-base md:py-3 md:px-6" variant="outline" size="lg">
                Sign Up
              </Button>

            </Link>
          </>
        ) : (
          <Popover>
            <PopoverTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarImage src={User?.profile.profilePhoto} />
              </Avatar>
            </PopoverTrigger>
            <PopoverContent className="p-4">
              <div className="flex items-center gap-4 mb-2">
                <Avatar className="cursor-pointer">
                  <AvatarImage src={User?.profile.profilePhoto} />
                </Avatar>
                <div>
                  <h4 className="font-medium">{User?.fullname}</h4>
                  <p className="text-sm text-muted-foreground">
                    {User?.profile.bio}
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                {User.role !== "Recruiter" && (
                  <div className="flex items-center gap-2 cursor-pointer">
                    <FaUser />
                    <Button variant="link">
                      <Link to="/profile">View profile</Link>
                    </Button>
                  </div>
                )}
                <div className="flex items-center gap-2 cursor-pointer">
                  <RiLogoutCircleRLine />
                  <Button onClick={logoutHandler} variant="link">
                    Logout
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        )}
      </div>
    </div>
  );
};

export default Navbar;
