import express from "express";
import { saveRights, getRights } from "../controllers/rightsControllers.js";
import userAuthentication from "../middleware/userAuthentication.js";

const router = express.Router();

router.post("/rights", userAuthentication, saveRights);       // Save or update user rights
router.get("/rights/:userId", userAuthentication, getRights); // Get user rights by userId

export default router;
