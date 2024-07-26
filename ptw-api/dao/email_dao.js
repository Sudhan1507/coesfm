import db from '../config/db_config.js';

export default class EmailPermit{
    static async getId(ptId) {
        const sql = `SELECT pt.ptId,pt.ptName, d.checklistId, d.serialNo, d.description, d.checkOption 
                     FROM m_permit_type pt
                     LEFT JOIN m_checklist_details d ON d.checklistId = pt.checklistId
                     WHERE pt.ptId = ?
                     ORDER BY serialNo`;

        try{
            const [result] = await db.execute(sql,[ptId]);
            return result;
        }catch(error){
            console.error('Error executing SQL: ', error);
            throw error;
        }
    }
}