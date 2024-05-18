import express from "express";
import {
  createCompany,
  getCompanyById,
  updateCompany,
  deleteCompany
} from "../controllers/company.controller.js";

const router = express.Router();

router.post("/", createCompany);
router.get("/:id", getCompanyById);
router.put("/:id", updateCompany);
router.delete("/:id", deleteCompany);

export default router;
