/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/notes";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";

const UpdateProfile = ({ open, setOpen }) => {
  const { User } = useSelector((store) => store.auth);
  const [input, setInput] = useState({
    fullname: User?.fullname || "",
    email: User?.email || "",
    phoneNo: User?.phoneNo || "",
    bio: User?.bio || "",
    skills: User?.skills?.join(", ") || "",
    file: null,
  });
  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNo", input.phoneNo);
    formData.append("bio", input.bio);
    formData.append("skills", input.skills);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      const res = await axios.post(
        `${USER_API_END_POINT}/profile/update`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        dispatch(setUser(res.data.User));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
    setOpen(false);
  };

  const resumeChangeHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const eventHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent onInteractOutside={() => setOpen(false)}>
          <DialogHeader>
            <DialogTitle>Update Profile</DialogTitle>
          </DialogHeader>
          <form onSubmit={submitHandler} className="space-y-4">
            <div>
              <Label htmlFor="fullname">Name</Label>
              <Input
                id="fullname"
                name="fullname"
                type="text"
                value={input.fullname}
                onChange={eventHandler}
                className="col-span-3"
              />
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={input.email}
                onChange={eventHandler}
                className="col-span-3"
              />
            </div>

            <div>
              <Label htmlFor="phoneNo">Phone Number</Label>
              <Input
                id="phoneNo"
                name="phoneNo"
                type="tel"
                value={input.phoneNo}
                onChange={eventHandler}
                className="col-span-3"
              />
            </div>

            <div>
              <Label htmlFor="bio">Bio</Label>
              <Input
                id="bio"
                name="bio"
                value={input.bio}
                onChange={eventHandler}
                className="col-span-3"
                rows="4"
              />
            </div>

            <div>
              <Label htmlFor="skills">Skills</Label>
              <Input
                id="skills"
                name="skills"
                value={input.skills}
                onChange={eventHandler}
                className="col-span-3"
              />
            </div>

            <div>
              <Label htmlFor="resume">Resume</Label>
              <Input
                id="resume"
                name="resume"
                type="file"
                accept="application/pdf"
                onChange={resumeChangeHandler}
                className="col-span-3"
              />
            </div>

            <div className="flex justify-end">
              <Button type="submit" className="bg-red text-white w-full">
                Update Profile
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UpdateProfile;
