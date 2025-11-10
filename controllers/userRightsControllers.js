import userRightsModel from "../models/userRightsModel.js";

// Create or Update rights for a user
export const saveRights = async (req, res) => {
    console.log(req.body)
      try {
        const { userId, modules } = req.body;

        if (!userId || !modules) {
          return res.status(400).json({ message: "userId and modules are required" });
        }

        // Find existing rights for user
        let rights = await userRightsModel.findOne({ userId });

        if (rights) {
          rights.modules = modules;
          await rights.save();
          return res.status(200).json({ message: "Rights updated successfully", rights });
        } else {
          const newRights = new userRightsModel({ userId, modules });
          await newRights.save();
          return res.status(201).json({ message: "Rights created successfully", rights: newRights });
        }
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error", error: err.message });
      }
};

// Get rights for a specific user
export const getRights = async (req, res) => {
    try {
        const { userId } = req.params;
        const rights = await userRightsModel.findOne({ userId });

        if (!rights) return res.status(404).json({ message: "No rights found" });

        res.status(200).json(rights);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};
