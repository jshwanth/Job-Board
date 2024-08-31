import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { getCompany, getCompanyByID, registerCompany, updateCompany } from "../controllers/company_controller.js";
import { singleUpload } from "../middlewares/multer.js";

const router= express.Router();

router.route("/register-company").post(isAuthenticated,registerCompany);
router.route("/get").get(isAuthenticated,getCompany);
router.route("/get/:id").get(isAuthenticated,getCompanyByID);
router.route("/update/:id").put(isAuthenticated,singleUpload,updateCompany);

export default router;