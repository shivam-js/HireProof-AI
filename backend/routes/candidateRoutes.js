import express from "express";

import {
  uploadCandidateResume,
  getAllCandidates,
  updateRecruitmentStatus,
  updateRecruiterNotes,
} from "../controllers/candidateController.js";

import { protect } from "../middleware/authMiddleware.js";

import upload from "../middleware/uploadMiddleware.js";



const router = express.Router();

router.get("/", protect, getAllCandidates);

router.put(
  "/:candidateId/status",
  protect,
  updateRecruitmentStatus
);

router.put(
  "/:candidateId/notes",
  protect,
  updateRecruiterNotes
);

router.post(
  "/upload",
  protect,
  upload.single("resume"),
  uploadCandidateResume
);

export default router;