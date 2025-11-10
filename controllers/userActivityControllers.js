import userActivityModel from "../models/userActivityModel.js";
import mongoose from 'mongoose';

// 📘 Get all user activity logs (latest first, with pagination + filters)
export const getAllUserActivities = async (req, res) => {
    try {
        let { page = 1, limit = 25, role, user: user_id, action } = req.query;


        // Convert to integers
        page = parseInt(page);
        limit = parseInt(limit);
        const skip = (page - 1) * limit;

        // Build filter object dynamically
        const filter = {};

        // Optional filters
        if (role) filter.role = role;

        // ✅ Convert user_id string to ObjectId safely
        if (user_id && mongoose.Types.ObjectId.isValid(user_id)) {
            filter.user_id = new mongoose.Types.ObjectId(user_id);
        }
        if (action) filter.action = { $regex: action, $options: "i" };

        // Fetch total count (for pagination)
        const total = await userActivityModel.countDocuments(filter);

        //  Fetch paginated results
        const activities = await userActivityModel.find(filter)
            .populate("user_id", "name email role")
            .sort({ date: -1 })
            .skip(skip)
            .limit(limit);

        const totalPages = Math.ceil(total / limit);

        res.status(200).json({
            success: true,
            currentPage: page,
            totalPages,
            totalRecords: total,
            results: activities.length,
            activities,
        });
    } catch (error) {
        console.error(" Error fetching user activities:", error);
        res.status(500).json({
            success: false,
            message: "Error fetching user activity logs",
            error: error.message,
        });
    }
};
