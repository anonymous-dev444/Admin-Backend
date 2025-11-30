import userRightsModel from "../models/userRightsModel.js";
import mongoose from "mongoose";

// Create or Update rights for a user
export const saveRights = async (req, res) => {

    try {
        let { userId, modules } = req.body;

        if (!userId || !modules) {
            return res.status(400).json({ message: "userId and modules are required" });
        }
        // Convert userId string to ObjectId
        userId = new mongoose.Types.ObjectId(userId)

        // Find existing rights for user
        let rights = await userRightsModel.findOne({ user_id: userId });

        if (rights) {
            rights.modules = modules;
            await rights.save();
            return res.status(200).json({ message: "Rights updated successfully", data: rights });
        } else {
            const newRights = new userRightsModel({ user_id: userId, modules: modules });
            await newRights.save();
            return res.status(201).json({ message: "Rights assigned successfully", data: newRights });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

// Get rights for a specific user
export const getRights = async (req, res) => {
    try {
        let { userId } = req.params;
        userId = new mongoose.Types.ObjectId(userId)

        const rights = await userRightsModel.findOne({ user_id: userId });

        if (!rights) return res.status(404).json({ data: rights });
        return res.status(200).json(({ data: rights }));
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};
