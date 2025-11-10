import express from 'express'
import { getAllUserActivities } from '../controllers/userActivityControllers.js';
import userAuthentication from '../middleware/userAuthentication.js'
const router = express.Router();

router.get("/get-users-activities",userAuthentication,getAllUserActivities);

export default router;