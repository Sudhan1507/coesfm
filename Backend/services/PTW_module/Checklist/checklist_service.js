import ChecklistDao from "../../../dao/PTW_module/Checklist/checklist_dao.js";

export default class ChecklistService {
    static async getChecklistNameService() {
        try {
            const checklistNames = await ChecklistDao.getChecklistNameDao();
            // console.log('Service - Fetched checklist names:', checklistNames);  // Add this line for debugging
            return checklistNames;
        } catch (err) {
            console.error('Error in getChecklistNameService: ', err);
        }
    }
}