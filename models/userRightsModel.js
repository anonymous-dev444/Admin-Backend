import mongoose from "mongoose";
const { Schema } = mongoose;

// ✅ Define rights without _id
const rightsSchema = new Schema(
  {
    entry: { type: Boolean, default: false },
    edit: { type: Boolean, default: false },
    list: { type: Boolean, default: false },
    delete: { type: Boolean, default: false },
  },
  { _id: false } // prevent _id in rights object
);

// ✅ Define module schema without _id
const moduleSchema = new Schema(
  {
    name: { type: String, required: true },
    rights: rightsSchema,
  },
  { _id: false } // prevent _id in module object
);

// ✅ Main rights schema
const userRightsSchema = new Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "tbl_user",
      required: true,
    },
    modules: [moduleSchema],
  },
  { timestamps: true }
);

const userRightsModel = mongoose.model("tbl_rights", userRightsSchema);
export default userRightsModel;
