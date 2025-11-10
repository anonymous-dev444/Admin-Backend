import mongoose from "mongoose";
const { Schema } = mongoose;

const contactSchema = new Schema({
    name: { type: String, required: true },
    email_id: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    response: { type: String },
    date: { type: Date, default: Date.now }
})

const contactModel = mongoose.model("lead", contactSchema);
export default contactModel;