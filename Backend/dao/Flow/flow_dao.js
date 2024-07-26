import db from '../../config/db_config.js';

export default class FlowDao{
    static async getAllFlowName(){
        const sql='SELECT flowId,flowName from m_flow';
        try{
        const [rows]=await db.execute(sql);
        return rows;
        }catch(err){
            console.error('Error executing SQL: ', err);
        }
    }

    static async checkFlowName(flowName) {
        const sql = `SELECT COUNT(*) AS count FROM m_flow WHERE LOWER(flowName) = LOWER(?)`;
        try {
            const [result] = await db.query(sql, [flowName]);
            return result[0].count === 0; // Return true if unique
        } catch (err) {
            console.error('Error executing SQL: ', err);
            throw err; // Rethrow error to be caught by service
        }
    }

    static async getFlowNameById(flowId) {
        const sql=`SELECT flowId,flowName FROM m_flow WHERE flowId = ?`;
        try{
            const [rows]=await db.execute(sql, [flowId]);
            return rows[0];
        }catch (err) {
            console.error('Error executing SQL: ', err);
            throw err; // Rethrow error to be caught by service
        }
    }

    static async getFlowIndex(){
        const sql=`SELECT f.flowId, f.flowName,
                   (SELECT COUNT(*) FROM m_flow_details fd WHERE fd.flowId = f.flowId) AS nofSteps
                    FROM m_flow f;`;
        try{
            const [rows]=await db.execute(sql);
            return rows;
        }catch(err){
            console.error('Error executing SQL: ', err);
        }
    }

    static async deleteFlowDetails(flowId){
        if (flowId === undefined || flowId === null) {
            throw new Error('flowId is required');
        }
        const deleteDetailsSql = 'DELETE FROM m_flow_details WHERE flowId = ?';
        const deleteFlowSql = 'DELETE FROM m_flow WHERE flowId = ?';
        try{
            await db.execute(deleteDetailsSql, [flowId]); // Delete details first
            await db.execute(deleteFlowSql, [flowId]); // Then delete the main flow
            return { status: 'deleteFlowDao: success' };

        }catch(err){
            console.error('Error executing SQL: ', err);
        }
    }

    static async createFlowName(flowName){
        const checkNameSql = `SELECT COUNT(*) AS count FROM m_flow WHERE LOWER(flowName) = LOWER(?)`;
        const createFlowNameSql='insert into m_flow(flowName) VALUES(?)';
        try{
             // Check if flow name is unique
             const [checkResult] = await db.query(checkNameSql, [flowName]);
             if (checkResult[0].count > 0) {
                 throw new Error('Duplicate entry for flowName');
             }
             // Create flow name if it is unique
            const [result] = await db.execute(createFlowNameSql, [flowName]);
            return result.insertId;
        }catch(error){
            console.error('Error executing SQL: ', error);
            throw error;
        }
    }
    static async updateFlowName(flowId,flowName){
        const checkNameSql = `SELECT COUNT(*) AS count FROM m_flow WHERE LOWER(flowName) = LOWER(?)`;
        const updateNameSql=`UPDATE m_flow SET flowName =? WHERE flowId =?`;

        try {
            // Check if flow name is unique
            const [checkResult] = await db.query(checkNameSql, [flowName]);
            if (checkResult[0].count > 0) {
                throw new Error('Duplicate entry for flowName');
            }

            // Update flow name if it is unique
            await db.execute(updateNameSql, [flowName, flowId]);
            return { status: 'updateFlowNameDao: success' }
        }catch(error){
            console.error('Error executing SQL: ', error);
            throw error;
        }
    }
    static async createFlowDetails(flowId, stepNo, statusName, declaration, userId){
        const createFlowDetailsSql='insert into m_flow_details(flowId,stepNo,statusName,declaration,userId) VALUES(?,?,?,?,?)';
        await db.execute(createFlowDetailsSql, [flowId, stepNo, statusName, declaration, userId || null]);

    }

    static async getFlowDetailsIndex(flowId){
         const sql = `SELECT fl.flowId, fl.flowName, f.flowId AS f_flowId, f.stepNo, f.statusName, f.declaration, f.userId, a.userName
                      FROM m_flow fl
                      INNER JOIN m_flow_details f ON fl.flowId = f.flowId
                      LEFT JOIN account a ON f.userId = a.userId
                      WHERE fl.flowId = ?
                      ORDER BY f.stepNo`;
        try{
            const [rows]=await db.execute(sql, [flowId]);
            return rows;
        }catch(err){
            console.error('Error executing SQL: ', err);
        }
    }

    static async deleteFlowStep(flowId, stepNo){
        const deleteSql = `DELETE FROM m_flow_details WHERE flowId=? AND stepNo=?`;
        const updateSql = `UPDATE m_flow_details SET stepNo = stepNo - 1 WHERE flowId=? AND stepNo > ?`;

    try {
        // Delete the specified step
        await db.execute(deleteSql, [flowId, stepNo]);

        // Update subsequent steps' numbers
        await db.execute(updateSql, [flowId, stepNo]);

        return { status: 'deleteFlowStepDao: success' };
    } catch (err) {
        console.error('Error executing SQL: ', err);
        throw err; // Rethrow the error to be handled in the service layer
        }
    }

    static async updateFlowStep(flowId,stepNo,statusName,declaration,userId) {
        const sql=`UPDATE m_flow_details SET statusName=?, declaration=?, userId=? WHERE flowId=? AND stepNo=?`;
        const params = [statusName, declaration, userId || null, flowId, stepNo];
        try{
            const [result] = await db.execute(sql, params);
            return result;
        }catch (err) {
            console.error('Error executing SQL: ', err);
            throw err;  // Re-throw the error after logging it
        }
    }

    static async addFlowStep(flowId,statusName,declaration,userId) {
        const sql=`INSERT INTO m_flow_details (StepNo,statusName,declaration,userId) VALUES(?,?,?,?)`;
        try{
            // Get the maximum step number for the given flowId
        const getMaxStepNoSql = `SELECT MAX(stepNo) as maxStepNo FROM m_flow_details WHERE flowId = ?`;
        const [maxStepResult] = await db.execute(getMaxStepNoSql, [flowId]);
        const maxStepNo = maxStepResult[0].maxStepNo || 0; // If no steps, start with 0

        // Increment the step number by one
        const newStepNo = maxStepNo + 1;

        // Insert the new step with the calculated step number
        const insertSql = `INSERT INTO m_flow_details (flowId, stepNo, statusName, declaration, userId) VALUES (?, ?, ?, ?, ?)`;
        const [result] = await db.execute(insertSql, [flowId, newStepNo, statusName, declaration, userId || null]);

        // Return the new step details
        return { flowId, stepNo: newStepNo, statusName, declaration, userId };
        }catch(err){
            console.error('Error executing SQL: ', err);
        }
    }
}

