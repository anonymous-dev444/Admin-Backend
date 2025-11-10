import userActivityModel from "../models/userActivityModel.js";

export const userlogActivity = async ({
  user_id,
  role,
  action,
  action_on,
  ip,
  os,
  browser
}) => {
  try {
    if (role === "Super Admin") return;

    await userActivityModel.create({
      user_id,
      role,
      action,
      action_on,
      ip: ip,
      browser: browser,
      os: os,
    });


    // Count total documents
    const totalDocs = await userActivityModel.countDocuments();

    // ✅ If more than 1000, delete oldest
    if (totalDocs > 1000) {
      const oldest = await userActivityModel.find().sort({ createdAt: 1 }).limit(totalDocs - 1000);
      const idsToDelete = oldest.map(doc => doc._id);
      await userActivityModel.deleteMany({ _id: { $in: idsToDelete } });
      console.log(`🧹 Cleaned up ${idsToDelete.length} old user activity logs`);
    }


  } catch (error) {
    console.error("Error logging user activity:", error);
  }
};
