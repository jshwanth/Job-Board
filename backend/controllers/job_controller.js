import { Job } from "../models/job_model.js";

export const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      experience,
      position,
      companyID,
    } = req.body;
    const userID = req.id;
    if (
      !title ||
      !description ||
      !requirements ||
      !salary ||
      !location ||
      !jobType ||
      !experience ||
      !position ||
      !companyID
    ) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }
    const job = await Job.create({
      title,
      description,
      requirements: requirements.split(","),
      salary: Number(salary),
      location,
      jobType,
      experience: experience,
      position,
      company: companyID,
      created_by: userID,
    });
    return res.status(201).json({
      message: "New job created successsfully",
      job,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateJob=async(req,res)=>{
  try {
    const { title, description, requirements, salary, location, jobType, experience, position } = req.body;

    // Prepare the data to update
    const updateData = {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      experience,
      position,
    };

    // Find the job by ID and update
    const job = await Job.findByIdAndUpdate(req.params.id, updateData, { new: true });

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: 'Job information updated successfully',
      success: true,
      job, // Optionally return the updated job data
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'An error occurred while updating the job',
      success: false,
    });
    
  }
}

export const getAllJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };
    const jobs = await Job.find(query)
      .populate({
        path: "company",
      })
      .sort({ createdAt: -1 });
    if (!jobs) {
      return res.status(404).json({
        message: "Jobs not found",
        success: false,
      });
    }
    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getJobByID = async (req, res) => {
  try {
    const jobID = req.params.id;
    const job = await Job.findById(jobID).populate({
      path: "applications",
    });
    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }
    return res.status(200).json({
      job,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAdminJobs = async (req, res) => {
  try {
    const adminID = req.id;
    const jobs = await Job.find({ created_by: adminID }).populate({
      path: "company",
      createdAt:-1
    });
    if (!jobs) {
      return res.status(404).json({
        message: "Jobs not found",
        success: false
      });
    }
    return res.status(200).json({
      jobs,
      success: true
    });
  } catch (error) {
    console.log(error);
  }
};
