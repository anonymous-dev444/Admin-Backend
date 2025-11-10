import leadModel from "../models/leadModel.js";
import { userlogActivity } from "../utils/userActivity.js";

export const getAllLeads = async (req, res) => {
    try {
        let { page = 1, limit = 10, name, email_id, mobile } = req.query;
        page = parseInt(page);
        limit = parseInt(limit);

        // Calculate how many documents to skip
        const skip = (page - 1) * limit;

        const filter = {};
        if (name) filter.name = { $regex: name, $options: "i" };
        // if (mobile) filter.mobile = { $regex: mobile, $options: "i" };
        if (email_id) filter.email_id = { $regex: email_id, $options: "i" };


        // Fetch paginated + filtered leads
        const [leads, totalLeads] = await Promise.all([
            leadModel.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
            leadModel.countDocuments(filter),
        ]);

        // Calculate total number of pages
        const totalPages = Math.ceil(totalLeads / limit);

        if (!leads || leads.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No leads found",
                leads: [],
                totalLeads: 0,
                totalPages: 0,
            });
        }

        // ✅ Return paginated data
        return res.status(200).json({
            success: true,
            leads,
            totalLeads,
            totalPages,
            currentPage: page,
        });
    } catch (error) {
        console.error("Error fetching leads:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};


export const getLead = async (req, res) => {
    const { id } = req.params;
    try {
        const lead = await leadModel.findOne({ _id: id });
        if (!lead) return res.status(400).json({ lead: lead })
        return res.status(200).json({ lead: lead })
    } catch (error) {
        console.log(error)
    }
}

export const getLeadBySearch = async (req, res) => {
    try {
        let { name, mobile, email_id, page = 1, limit = 15 } = req.query;
        page = parseInt(page);
        limit = parseInt(limit);
        // Calculate how many documents to skip
        const skip = (page - 1) * limit;

        // Build dynamic filter
        const filter = {};
        if (name) filter.name = { $regex: name, $options: "i" }; // case-insensitive
        // if (mobile) filter.mobile = { $regex: mobile, $options: "i" };
        if (email_id) filter.email_id = { $regex: email_id, $options: "i" };

        // Fetch leads with pagination + total count in parallel
        const [leads, totalLeads] = await Promise.all([
            leadModel.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
            leadModel.find(filter).countDocuments(),
        ]);
        // Calculate total number of pages
        const totalPages = Math.ceil(totalLeads / limit);

        if (!leads || leads.length == 0) return res.status(400).json({ message: "Lead not found!", leads, totalLeads })
        return res.status(200).json({
            success: true,
            leads,
            totalLeads,
            totalPages,
            currentPage: page,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }


}
export const createLead = async (req, res) => {
    const { name, email, subject, message } = req.body;
    try {
        const lead = await leadModel.create({
            name: name,
            email_id: email,
            subject: subject,
            message: message
        })
        if (lead) {
            return res.status(200).json({ message: "Send Successfully!" })

        } else {
            return res.status(400).json({ message: "Something Went Wrong!" })

        }

    } catch (error) {
        console.log(error)
    }

}
export const deleteLead = async (req, res) => {
    const { id } = req.params;
    const { doc_id, role } = req.user;
    const { ip, os, browser, browserVersion } = req.clientDetails;
    try {

        const lead = await leadModel.findOneAndDelete({ _id: id });
        if (!lead) return res.status(400).json({ message: "No lead available!" });
        await userlogActivity({
            user_id: doc_id,
            action: "Lead Delete",
            action_on: lead.name,
            role: role,
            ip: ip,
            os: os,
            browser: browser + " " + browserVersion
        })

        return res.status(200).json({ message: "Lead Deleted!" });


    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: "somthing went wrong!", error });
    }

}
export const editLead = async (req, res) => {
    const { id } = req.params
    const fieldData = req.body

    try {
        const updatedLead = await leadModel.findOneAndUpdate({ _id: id }, { $set: fieldData }, { new: true, runValidators: true });
        if (!updatedLead)
            return res.status(400).json({ message: "Something Went Wrong!" })
        return res.status(200).json({ message: "Send Successfully!", lead: updatedLead })
    } catch (error) {
        console.log(error)
    }

}