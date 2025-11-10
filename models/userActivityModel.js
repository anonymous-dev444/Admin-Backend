import mongoose from "mongoose";
const { Schema } = mongoose;

const userActivitySchema = new Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "tbl_user",
            required: true,
        },
        role: { type: String, enum: ["User", "Admin"] },
        action: {
            type: String,
            required: true,
        },
        action_on: {
            type: String,
            default: null,
        },
        ip: {
            type: String,
            default: null,
        },
        browser: {
            type: String,
            default: null,
        },
        os: {
            type: String,
            default: null,
        },
        date: {
            type: Date,
            default: Date.now,
        },
    }
);

const userActivityModel = mongoose.model("tbl_user_activity", userActivitySchema);
export default userActivityModel;
