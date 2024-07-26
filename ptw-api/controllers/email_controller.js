import handleError from "../utils/pt_utils.js";
import EmailPermitService from '../services/email_service.js';


export default class EmailPermitController{
    static async sendEmailController(req, res) {
        const { to, subject, text } = req.body;

        try {
            await EmailPermitService.sendEmail(to, subject, text);
            res.status(200).json({ message: 'Email sent successfully!' });
        } catch (err) {
            console.error('Error in sendEmailController: ', err);
            if (!res.headersSent) {
                res.status(500).json({ status: 'failed', error: err.message });
            }
        }
    }
}