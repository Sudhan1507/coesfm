import FlowDao from '../../dao/Flow/flow_dao.js';
import db from '../../config/db_config.js';

export default class FlowService{
    static async getAllFlowNameService(){
        try{
            const flownames=await FlowDao.getAllFlowName();
            return flownames;
        }catch(err){
            console.error('Error in getFlowNameService: ', err);
        }
    }

    static async checkFlowNameService(flowName){
        try {
            const isUnique = await FlowDao.checkFlowName(flowName);
            return isUnique;
        } catch (err) {
            console.error('Error in checkFlowNameService: ', err);
            throw err;
        }
    }
    static async getFlowIndexService(){
        try{
            const flowIndex=await FlowDao.getFlowIndex();
            return flowIndex;
        }catch(err){
            console.error('Error in getFlowIndexService: ', err);
        }
    }

    static async deleteFlowDetailsService(flowId){
        if (!flowId) {
            throw new Error('flowId is required');
        }
        try{
            const result=  await FlowDao.deleteFlowDetails(flowId);
            console.log('{ status: Delete Flow Details service: success }');
        }catch(err){
            console.error('Error in deleteFlowDetailsService: ',err);
            throw err;
        }
    }

   static  async createFlowDetails(flowName, steps) {
    let connection;

    try {
        connection = await db.getConnection(); // Get a connection from the pool
        await connection.beginTransaction(); // Start a transaction

        // Create flow
        const flowId = await FlowDao.createFlowName(flowName, connection);

        // Add steps to m_flow_details
        let stepNo = 1;
        for (const step of steps) {
            const { statusName, declaration, userId } = step;
            await FlowDao.createFlowDetails(flowId, stepNo, statusName, declaration, userId, connection);
            stepNo++;
        }

        await connection.commit(); // Commit the transaction
        return { flowId };
    } catch (error) {
        if (connection) await connection.rollback(); // Rollback the transaction on error
        console.error('Error executing SQL: ', error);
        throw error; // Re-throw the error to handle it upstream
    } finally {
        if (connection) connection.release(); // Release the connection back to the pool
        }
    }
    static async getFlowNameService(flowId) {
        try{
            const flowName=await FlowDao.getFlowNameById(flowId);
            return flowName;
        }catch(err){
            console.error('Error in getFlowNameService: ', err);
            throw err;
        }
    }

    static async getFlowDetailsIndexServer(flowId) {
        try{
            const flowDetailsIndex=await FlowDao.getFlowDetailsIndex(flowId);
            return flowDetailsIndex;
        }catch (error) {
            console.error('Error in getFlowDetailsIndexServer: ', error);
            throw error;
        }
    }


    static async deleteFlowStepService(flowId,stepNo) {
        try{
            await FlowDao.deleteFlowStep(flowId, stepNo);
            console.log('{ status: Delete Flow Step service: success }');
        }catch (error) {
            console.error('Error in deleteFlowStep: ', error);
            throw error;
        }
    }
    static async updateFlowNameService(flowName,flowId) {
        try{
            await FlowDao.updateFlowName(flowName, flowId);
            console.log('{ status: Update Flow Name service: success }');
        }catch (error) {
            console.error('Error in updateFlowNameService: ', error);
            throw error;
        }
    }
    static async updateFlowStepService(flowId, stepNo, statusName, declaration, userId) {
        try{
            await FlowDao.updateFlowStep(flowId, stepNo, statusName, declaration, userId);
            console.log('{ status: Update Flow Step service: success }');
        }catch (error) {
            console.error('Error in updateFlowStepService: ', error);
            throw error;
        }
    }

    static async addFlowStepService(flowId, statusName, declaration,userId){
            try{
            const result = await FlowDao.addFlowStep(flowId, statusName, declaration, userId);
            console.log('{ status: "Add Flow Step service: success", result }');
            return result;

            }catch (error) {
            console.error('Error in addFlowStepService: ', error);
            throw error;
            }
    }
}