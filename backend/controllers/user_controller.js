import { user } from "../models/user_model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const register = async (req, res) => {
  try {
    const { fullname, email, phoneNo, password, role } = req.body;
    // console.log(fullname, email, phoneNo, password, role);
    
    
    if (!fullname || !email || !phoneNo || !password || !role) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }
    const file = req.file;
    const fileUri =getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content)
    const User = await user.findOne({ email });
    if (User) {
      return res.status(400).json({
        message: "User already exists",
        success: false,
      });
    }
    const hashedPassowrd = await bcrypt.hash(password, 10);
    await user.create({
      fullname,
      email,
      phoneNo,
      password: hashedPassowrd,
      role,
      profile:{
        profilePhoto:cloudResponse.secure_url,
      }
    });
    return res.status(201).json({
      message: "Account created successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }
    let User = await user.findOne({ email });
    if (!User) {
      return res.status(400).json({
        message: "Incorrect email or password",
        success: false,
      });
    }
    const isPasswordMatched = await bcrypt.compare(password, User.password);
    if (!isPasswordMatched) {
      return res.status(400).json({
        message: "Incorrect email or password",
        success: false,
      });
    }

    // check for role:
    if (role !== User.role) {
      return res.status(400).json({
        message: "Account doesn't exist with this role",
        success: false,
      });
    }
    const tokenData = {
      userID: User._id,
    };
    const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    User = {
      _id: User._id,
      fullname: User.fullname,
      email: User.email,
      phoneNo: User.phoneNo,
      role: User.role,
      profile: User.profile,
    };

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpsOnly: true,
        sameSite: "strict",
      })
      .json({
        message: `Welcome back ${User.fullname}`,
        User,
        success: true,
      });
  } catch (error) {
    console.log(error);
  }
};

export const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logged out successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
export const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phoneNo, bio, skills } = req.body;
    // console.log(fullname, email, phoneNo, bio, skills);
    
    const file = req.file;
    //cloudinary will come
    const fileUri=getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
    
    let skillsArray;
    if (skills) {
      skillsArray = skills.split(",");
    }
    const userID = req.id; //middleware authentication
    let User = await user.findById(userID);
    if (!User) {
      return res.status(400).json({
        message: "User not found",
        success: false,
      });
    }
    //updating data:
    if (fullname) User.fullname = fullname;
    if (email) User.email = email;
    if (phoneNo) User.phoneNo = phoneNo;
    if (bio) User.profile.bio = bio;
    if (skills) User.profile.skills = skillsArray;


    //resume will coem here
    if(cloudResponse){
      User.profile.resume=cloudResponse.secure_url;
      User.profile.resumeOriginalName = file.originalname; //save original file consisting of name
    }

    await User.save();

    User = {
      _id: User._id,
      fullname: User.fullname,
      email: User.email,
      phoneNo: User.phoneNo,
      role: User.role,
      profile: User.profile,
    };
    return res.status(200).json({
      message: "Profile updated successfully",
      User,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
