import mongoose from "mongoose";
const { Schema } = mongoose;

const rightsSchema = new Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "tbl_user",
        required: true,
    },
    modules: [
        {
            name: { type: String, required: true },
            rights: {
                entry: { type: Boolean, default: false },
                edit: { type: Boolean, default: false },
                list: { type: Boolean, default: false },
                delete: { type: Boolean, default: false },
            },
        },
    ],
}, { timestamps: true });

const userRightsModel = mongoose.model("tbl_rights", rightsSchema);
export default userRightsModel;
