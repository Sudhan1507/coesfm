import db from '../../config/db_config.js';

export default class ChecklistDao {
    static async getChecklistNameDao() {
        const sql = 'SELECT checklistId,cName FROM m_checklist;';
        try {
            const [rows] = await db.execute(sql);
            // console.log('DAO - Fetched rows:', rows);  // Add this line for debugging
            return rows; 
        } catch (err) {
            console.error('Error executing SQL: ', err);
        }
    }
}