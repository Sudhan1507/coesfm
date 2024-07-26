import dotenv from 'dotenv';
import nodemailer from 'nodemailer';


dotenv.config({path:'./app.env'});

export default class EmailPermitService{
    static async sendEmail(to, subject, text) {
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to,
            subject,
            text,
        };
        try {
            await transporter.sendMail(mailOptions);
            console.log('Email sent successfully');
        } catch (error) {
            console.error('Error sending email: ', error);
            throw error;
        }
    }
}