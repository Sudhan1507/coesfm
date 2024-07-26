import ChecklistService from "../../services/Checklist/checklist_service.js";
import handleError from "../../utils/pt_utils.js";

export default class ChecklistController{
 static async getChecklistNameController(req, res) {
    try {
        const checklistNames = await ChecklistService.getChecklistNameService();
        // console.log('Controller - Sending checklist names:', checklistNames);  // Add this line for debugging
        res.json(checklistNames);
    } catch (err) {
        handleError(res, err);
        res.json({ status: 'failed' });
    }
 }
}


