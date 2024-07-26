import db from '../../config/db_config.js';
export default class PermitToWorkDao{

    static async createPermitToWork({appId, ptId, flowId, checklistId, userId, activeStatus }){
        const sql= `INSERT INTO m_permit_to_work(appId,ptId, flowId, checklistId, userId, activeStatus)
                    VALUES(?,?,?,?,?,?)`;
        try {
            await db.execute(sql, [appId, ptId, flowId, checklistId, userId, activeStatus]);
        }catch(err){
            console.error('Error executing SQL: ', err);
            throw err;
        }
    }
    static async getAllPermitToWork(){
        const sql= `SELECT ptw.appId, pt.ptName, fl.statusName, fl.stepNo, a.userName, a.userId,a.emailId, DATE_FORMAT(ptw.updatedOn, '%d/%m/%Y %h:%i %p') AS updatedOn
                    FROM m_permit_to_work ptw
                   JOIN m_permit_type pt ON ptw.ptId = pt.ptId 
                   JOIN m_flow_details fl ON pt.flowId = fl.flowId AND ptw.current_step_no = fl.stepNo
                   JOIN account a ON fl.userId = a.userId`;
        try {
            const [rows] = await db.execute(sql);
            return rows;
        }catch(err){
            console.error('Error executing SQL: ', err);
            throw err;
        }
    }
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

    static async getPermitTypeName(){
        const sql = `SELECT ptId, ptName, checklistId,flowId,reqId,remarks,active FROM m_permit_type`;
        try{
            const [rows] = await db.execute(sql);
            return rows;
        }catch(error){
            console.error('Error executing SQL: ', error);
            throw error;
        }
    }


    static async addMultipleChecklistResponses(ptId, activeStatus, createdBy, responses,statusName, signOffRemarks, userId, signature, processedAt) {
        const insertPTWSql = `INSERT INTO m_permit_to_work (ptId, activeStatus, createdBy)
            VALUES (?, ?, ?)`;
        const insertAppSignOffSql=`INSERT INTO app_sign_off (appId,statusName,signOff_remarks,userId,signature,processedAt) VALUES(?,?,?,?,?,?)`;
        const insertResponseSql = `INSERT INTO m_ptw_response (appId, serialNo, checkOptions, remarks, createdBy)
            VALUES (?, ?, ?, ?, ?)`;
        const connection = await db.getConnection();
    
        try {
            await connection.beginTransaction();
            console.log('Inserting into m_permit_to_work:', ptId, activeStatus, createdBy);
    
            // Validate inputs
            if (!ptId || !activeStatus || !createdBy) {
                throw new Error('ptId, activeStatus, and createdBy must be provided');
            }
    
            // Insert permit-to-work data
            const [result] = await connection.execute(insertPTWSql, [ptId, activeStatus, createdBy]);
            const appId = result.insertId;

            // Insert app_sign_off data
            await connection.execute(insertAppSignOffSql, [
            appId,
            statusName || null,
            signOffRemarks || null,
            userId || null,
            signature || null,
            processedAt || null
            ]);
    
            for (let response of responses) {
                const { serialNo, checkOptions, remarks } = response;
    
                // Validate response data
                if (serialNo === undefined || checkOptions === undefined) {
                    throw new Error('serialNo and checkOptions must be provided for each response');
                }
    
                // Handle undefined values
                const remarksValue = remarks !== undefined ? remarks : null;
                console.log('Inserting into m_ptw_response:', appId, serialNo, checkOptions, remarksValue, createdBy);
                await connection.execute(insertResponseSql, [appId, serialNo, checkOptions, remarksValue, createdBy]);
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
    static async getSignOff(appId){
        const sql= `SELECT ptw.appId, fl.declaration 
                    FROM m_permit_to_work ptw 
                    JOIN 
                    m_permit_type pt ON ptw.ptId = pt.ptId 
                    JOIN 
                    m_flow_details fl ON pt.flowId = fl.flowId AND ptw.current_step_no=fl.stepNo
                    WHERE appId=?`;
            try{
                const [result] = await db.execute(sql,[appId]);
                return result;
            }catch(err){
                console.error('Error executing SQL: ', err);
                throw err;
            }
    };

        static async addSignOff(appId, statusName, signOffRemarks, userId, signature) {
            const checkCountSql = `
                SELECT ptw.appId, COUNT(*) AS stepCount
                FROM m_permit_to_work ptw
                JOIN m_permit_type pt ON ptw.ptId = pt.ptId 
                JOIN m_flow_details fl ON pt.flowId = fl.flowId
                WHERE ptw.appId = ?
                GROUP BY ptw.appId;
            `;
    
            const getCurrentStepSql = `
                SELECT current_step_no 
                FROM m_permit_to_work 
                WHERE appId = ?;
            `;
    
            // Get the total steps
            const [checkCount] = await db.execute(checkCountSql, [appId]);
            if (checkCount.length === 0) {
                throw new Error('Application not found');
            }
            const signOffStep = checkCount[0].stepCount;
    
            // Get the current step
            const [currentStepResult] = await db.execute(getCurrentStepSql, [appId]);
            if (currentStepResult.length === 0) {
                throw new Error('Current step not found for the application');
            }
            const currentStepCount = currentStepResult[0].current_step_no;
    
            let updateSql;
            if (currentStepCount === signOffStep) {
                // Update work status to 1
                updateSql = `
                    UPDATE m_permit_to_work 
                    SET workStatus = 1 
                    WHERE appId = ?;
                `;
            } else {
                // Update current step
                updateSql = `
                    UPDATE m_permit_to_work 
                    SET current_step_no = current_step_no + 1 
                    WHERE appId = ?;
                `;
            }
    
            // Execute the update query
            await db.execute(updateSql, [appId]);
    
            // Insert into app_sign_off
            const insertSignOffSql = `
                INSERT INTO app_sign_off (appId, statusName, signOff_remarks, userId, signature, processedAt) 
                VALUES (?, ?, ?, ?, ?, NOW());
            `;
    
            await db.execute(insertSignOffSql, [appId, statusName, signOffRemarks, userId, signature]);
        }
    
        static async getChecklistResponse(appId) {
            const sql = `SELECT ptw.appId, c.cName, cl.checklistId, cl.serialNo, cl.description, rs.checkOptions, rs.remarks, 
                            DATE_FORMAT(ptw.createdOn, '%d/%m/%Y %h:%i %p') AS createdOn
                        FROM 
                            m_permit_to_work ptw 
                        JOIN
                            m_permit_type pt ON ptw.ptId = pt.ptId
                        JOIN
	                        m_checklist c ON pt.checklistId=c.checklistId
                        JOIN
                            m_checklist_details cl ON  pt.checklistId = cl.checklistId
                        JOIN
                            m_ptw_response rs ON ptw.appId = rs.appId  AND cl.serialNo = rs.serialNo
                        WHERE 
                            ptw.appId = ?`;
            try {
                const [rows] = await db.execute(sql, [appId]);
                return rows;
            } catch (err) {
                console.error('Error executing SQL: ', err);
                throw err;
            }
        }

        static async getSignOffHistory(appId){
            const sql=`SELECT s.appId, s.statusName, s.signOff_remarks, a.userName ,s.signature,
                        DATE_FORMAT( s.processedAt, '%d/%m/%Y %h:%i %p') AS processedAt,
                        DATE_FORMAT(s.createdOn, '%d/%m/%Y %h:%i %p') AS createdOn
                       FROM app_sign_off s
                       JOIN account a ON s.userId=a.userId
                       WHERE s.appId=?`;

                try{
                    const [rows] = await db.execute(sql,[appId]);
                    return rows;
                }catch(err){
                    console.error('Error executing SQL: ', err);
                    throw err;
                }
        }

        static async deletePermitToWork(appId){
            const sql =`DELETE FROM m_permit_to_work WHERE appId=?`;
            try{
                await db.execute(sql,[appId]);
            }catch(err){
                console.error('Error executing SQL: ', err);
                throw err;
            }
        }
}