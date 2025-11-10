import express from "express";
import { getAllLeads, createLead, deleteLead, getLead, editLead, getLeadBySearch, } from "../controllers/leadsController.js";
import userAuthentication from "../middleware/userAuthentication.js";
import getClientDetails from "../middleware/getClientInfo.js";

const router = express.Router();

router.get("/get-all-leads", userAuthentication, getAllLeads);
router.get("/get-lead/:id", userAuthentication, getLead);
router.get("/get-search-leads", userAuthentication, getLeadBySearch);
router.post("/create-lead", getClientDetails, createLead);
router.put("/edit-lead/:id", userAuthentication, getClientDetails, editLead);
router.delete("/delete-lead/:id", userAuthentication, getClientDetails, deleteLead);

export default router;