import EmailService from "../../../services/PTW_module/E-mail/email_service.js";
import crypto from 'crypto';
import db from '../../../config/db_config.js';


function generateToken() {
    return crypto.randomBytes(32).toString('hex');
}

export default class EmailController {
    static async sendNotification(req, res) {
        try {
            const { email,checklistId,permitTypeName,username,permitType } = req.body;
            const token = generateToken();
            const expiration = new Date();
            expiration.setHours(expiration.getHours() + 24);
            const link = `http://localhost:3000/complete_permit_to_work/${btoa(email)}/${btoa(permitType)}/${token}`;
            console.log(token);


            // Store the token in the database
            await db.query(
                'INSERT INTO checklist_token(email, checklistId, token, used, expiration) VALUES (?, ?, ?, ?, ?)',
                [email, checklistId, token, false, expiration]
            );

             // Send the email with the link
             const mailContent = `
        <h1>Permit to Work Application: ${permitTypeName}</h1>
        <p>${username} has sent you a Permit to Work Application: <strong>${permitTypeName}</strong> for completion.</p>
        <p>Link to <a href="${link}" target="_blank">Permit to Work Application</a></p>
    `;


            // Pass the received email and htmlContent to the service
            await EmailService.sendNotification(email, mailContent);

            res.status(201).json({ status: 'success' });
        } catch (err) {
            console.error('Error in sendNotification controller:', err);
            res.status(500).json({ status: 'failed', error: err.message });
        }
    }
};