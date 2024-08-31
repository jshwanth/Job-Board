import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { getAdminJobs, getAllJobs, getJobByID, postJob, updateJob } from "../controllers/job_controller.js";

const router= express.Router();

router.route("/post-job").post(isAuthenticated,postJob);
router.route("/get").get(isAuthenticated,getAllJobs);
router.route("/get-admin-jobs").get(isAuthenticated,getAdminJobs);
router.route("/get/:id").get(isAuthenticated,getJobByID);
router.route("/update/:id").put(isAuthenticated,updateJob);

export default router;