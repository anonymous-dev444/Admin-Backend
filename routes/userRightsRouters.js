import express from "express";
import { saveRights, getRights } from "../controllers/userRightsControllers.js";

const router = express.Router();

router.post("/rights", saveRights);       // Save or update user rights
router.get("/rights/:userId", getRights); // Get user rights by userId

export default router;
