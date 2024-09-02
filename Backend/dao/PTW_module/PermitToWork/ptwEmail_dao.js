import db from '../../../config/db_config.js';

export default class PermitToWorkEmailDao{

static async getPermitTypeById(ptId) {
    const sql = `SELECT pt.ptId,pt.ptName, d.checklistId, d.serialNo, d.description
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

    static async addMultipleChecklistResponses(ptId, activeStatus, email, responses, statusName, signOffRemarks, signature, processedAt) {
        const insertPTWSql = `INSERT INTO m_permit_to_work (ptId, activeStatus, email)
                              VALUES (?, ?, ?)`;
        const insertAppSignOffSql = `INSERT INTO app_sign_off (appId, statusName, signOff_remarks, signature, processedAt, email)
                                     VALUES (?, ?, ?, ?, ?, ?)`;
        const insertResponseSql = `INSERT INTO m_ptw_response (appId, serialNo, checkOptions, remarks, email)
                                   VALUES (?, ?, ?, ?, ?)`;
    
        const connection = await db.getConnection();
    
        try {
            await connection.beginTransaction();
            // console.log('Inserting into m_permit_to_work:', ptId, activeStatus, createdBy, email);
    
            // Validate that at least one of createdBy or email is provided
            if (!ptId || !activeStatus || !email) {
                throw new Error('ptId, activeStatus, email must be provided');
            }
    
            // Insert permit-to-work data
            const [result] = await connection.execute(insertPTWSql, [ptId, activeStatus,  email]);
            // console.log(result, 'first insert');
            const appId = result.insertId;
            // console.log(appId, 'second insert');
    
            // Insert app_sign_off data
            await connection.execute(insertAppSignOffSql, [
                appId,
                statusName,
                signOffRemarks || null,
                signature || null,
                processedAt || null,
                email || null
            ]);
    
            for (let response of responses) {
                const { serialNo, checkOptions, remarks } = response;
    
                // Validate response data
                if (serialNo === undefined || checkOptions === undefined) {
                    throw new Error('serialNo and checkOptions must be provided for each response');
                }
    
                // Handle undefined remarks
                const remarksValue = remarks !== undefined ? remarks : null;
                // console.log('Inserting into m_ptw_response:', appId, serialNo, checkOptions, remarksValue, createdBy, email);
                await connection.execute(insertResponseSql, [appId, serialNo, checkOptions, remarksValue, email]);
            }
    
            await connection.commit();
        } catch (error) {
            await connection.rollback();
            console.error('Error executing SQL for multiple responses: ', error);
            throw error;
        } finally {
            connection.release();
        }
    }


};