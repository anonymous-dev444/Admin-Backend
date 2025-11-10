import nodemailer from "nodemailer";
import dotenv from 'dotenv'
dotenv.config()

export const sendEmail = async ({ to, subject, html }) => {
    try {
        // Create a transporter
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });
        transporter.verify(function (error, success) {
            if (error) {
                // This will print if mail.anandtransport.com cannot be reached or credentials fail
                console.error("❌ SMTP Connection Error! Please check your credentials and port.");
                console.error("Details:", error.message);
            } else {
                console.log("✅ SMTP Server Connection Verified: Ready to send emails.");
            }
        });

        // Define email options
        const mailOptions = {
            from: `"Expert It Services" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            html,
        };

        // Send email
        const info = await transporter.sendMail(mailOptions);
        return info;
    } catch (error) {
        console.error("❌ Email failed:", error);
        throw new Error("Email could not be sent");
    }
};
