import { Application } from "../models/application_model.js";
import { Job } from "../models/job_model.js";

export const applyJob = async (req, res) => {
  try {
    const userID = req.id;
    const jobID = req.params.id;
    if (!jobID) {
      return res.status(400).json({
        message: "Job Id is required",
        success: false,
      });
    }

    //to check if user has already applied for job:
    const appliedAlready = await Application.findOne({
      job: jobID,
      applicant: userID,
    });
    if (appliedAlready) {
      return res.status(400).json({
        message: "You have already applied for this job",
        success: false,
      });
    }

    const job = await Job.findById(jobID);
    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }

    // create a new application
    const newApplication = await Application.create({
      job: jobID,
      applicant: userID,
    });

    job.applications.push(newApplication._id);
    await job.save();
    return res.status(201).json({
      message: "Job applied successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAppliedJobs = async (req, res) => {
  try {
    const userID = req.id;
    const application = await Application.find({ applicant: userID })
      .sort({ createdAt: -1 })
      .populate({
        path: "job",
        options: { sort: { createdAt: -1 } },
        populate: {
          path: "company",
          options: { sort: { createdAt: -1 } },
        },
      });
      if(!application){
        return res.status(404).json({
            message:'No applications',
            success:false
        })
      }
      return res.status(200).json({
        application,
        success:true
      })
  } catch (error) {
    console.log(error);
  }
};

// get how many users have applied for jobs:
export const getApplicants = async (req,res) => {
    try {
        const jobID = req.params.id;
        const job = await Job.findById(jobID).populate({
            path:'applications',
            options:{sort:{createdAt:-1}},
            populate:{
                path:'applicant'
            }
        });
        if(!job){
            return res.status(404).json({
                message:'Job not found.',
                success:false
            })
        };
        return res.status(200).json({
            job, 
            success:true
        });
    } catch (error) {
        console.log(error);
    }
}

//get updated status
export const updateStatus = async (req,res) => {
    try {
        const {status} = req.body;
        const applicationID = req.params.id;
        if(!status){
            return res.status(400).json({
                message:'status is required',
                success:false
            })
        };

        // find the application by applicantion id
        const application = await Application.findOne({_id:applicationID});
        if(!application){
            return res.status(404).json({
                message:"Application not found.",
                success:false
            })
        };

        // update the status
        application.status = status.toLowerCase();
        await application.save();

        return res.status(200).json({
            message:"Status updated successfully.",
            success:true
        });

    } catch (error) {
        console.log(error);
    }
}