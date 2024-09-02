import nodemailer from 'nodemailer';

export default class EmailService {
   static async sendNotification(email, htmlContent) {
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            // secure: process.env.EMAIL_SECURE, 
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        console.log('host: ' + process.env.EMAIL_HOST);
        console.log('port: ' + process.env.EMAIL_PORT);
        // console.log('secure: ' + process.env.EMAIL_SECURE);
        console.log('user: ' + process.env.EMAIL_USER);
        console.log('pass: ' + process.env.EMAIL_PASS);

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Permit to Work Application',
            html: htmlContent
        };

        try {
            const info = await transporter.sendMail(mailOptions);
            console.log('Email sent:', info.response);
            return info;
        } catch (error) {
            console.error('Error sending email:', error);
            throw new Error('Failed to send email');
        }
    }
};