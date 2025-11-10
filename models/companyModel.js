import mongoose from 'mongoose'

const { Schema } = mongoose;

const companySchema = new Schema({
    name: { type: String, required: true, maxLength: 200 },
    display_name: { type: String, required: true, maxLength: 200 },
    gstin: { type: String, maxLength: 30 },
    aadhaar: { type: String, maxLength: 12 },
    pan: { type: String, maxLength: 10 },
    jurisdiction: { type: String, maxLength: 100 },

    phone: { type: String, required: true, maxLength: 15 },
    mobile: { type: String, required: true, maxLength: 15 },
    email_id: { type: String, required: true, maxLength: 50 },
    website: { type: String, maxLength: 200 },
    city: { type: String, required: true, maxLength: 50 },
    state: { type: String, required: true, maxLength: 50 },
    country: { type: String, required: true, maxLength: 50 },
    address: { type: String, required: true, maxLength: 200 },
    pin: { type: String, required: true, maxLength: 6 },

    social: {
        facebook: { type: String, maxLength: 200, default: null },
        instagram: { type: String, maxLength: 200, default: null },
        twitter: { type: String, maxLength: 200, default: null },
        linkedin: { type: String, maxLength: 200, default: null },
        youtube: { type: String, maxLength: 200, default: null },
        rss: { type: String, maxLength: 200, default: null },
    },


    images: {
        icon: { type: String, maxLength: 100, default: null },       // File URL or path
        logo: { type: String, maxLength: 100, default: null },
        login_icon: { type: String, maxLength: 100, default: null },
        login_bg: { type: String, maxLength: 100, default: null },
    },
    edit_info: {
        type: String

    },
}, {
    collection: 'tbl_company' // Explicitly set the collection name
})
const CompanyModel = mongoose.model("tbl_company", companySchema);

export default CompanyModel;