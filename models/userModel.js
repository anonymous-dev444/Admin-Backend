import mongoose from "mongoose";
import Counter from "./user_id_Counter.js"

const { Schema } = mongoose;

const userSchema = new Schema({
  user_id: { type: Number, unique: true, },
  name: { type: String, required: true },
  email_id: { type: String, required: true, unique: true },
  mobile: { type: String, required: true, unique: true },
  gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
  role: { type: String, enum: ["User", "Admin", "Super Admin"], default: "User" },
  password: { type: String, required: true },
  date: { type: Date, default: Date.now },
  status: { type: String, enum: ["Enabled", "Disabled"], default: "Enabled" },
  image: { type: String, default: null }
})


// Auto-increment user_id before saving
userSchema.pre("save", async function (next) {
  if (this.isNew) {
    const counter = await Counter.findOneAndUpdate(
      { id: "user_id" },       // counter name
      { $inc: { seq: 1 } },    // increment by 1
      { new: true, upsert: true } // create if not exists
    );
    this.user_id = counter.seq;
  }
  next();
});




const userModel = mongoose.model("tbl_user", userSchema);
export default userModel;