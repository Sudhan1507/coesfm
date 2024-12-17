import Procurement from "../../dao/Procurement_module/procurement_dao.js";


export default class ProcurementService{

    static async getAllProcurementService(){
        try{
            const procurements=await Procurement.getAllProcurementDao();
            return procurements;
        }catch(err){
            console.error('Error in getAllProcurementService: ', err);
            throw err;
        };
    };

    static async createProcurementService(payload) {
        try {
            const procurement = await Procurement.createProcurement(payload);
            return { procurement_id: procurement.insertId }; // Return the inserted procurement ID
        } catch (err) {
            console.error('Error in createProcurementService: ', err);
            throw err;
        }
    };

    static async saveDocumentFile(file) {
        const directoryPath = path.join(__dirname, '../../Documents');
        
        // Create directory if not exists
        if (!fs.existsSync(directoryPath)) {
            fs.mkdirSync(directoryPath, { recursive: true });
        }
    
        // Save file with unique name
        const fileName = `${Date.now()}_${file.name}`;
        const filePath = path.join(directoryPath, fileName);
    
        // Move file to the new directory
        try {
            file.mv(filePath); // Assuming you're using a middleware like express-fileupload
            return filePath; // Return the path to store in DB
        } catch (err) {
            console.error('Error saving file: ', err);
            throw err;
        }
    }
    
    static async addProcurementDocumentService(payload) {
        try {
            const { procurement_id, document_path, created_by } = payload;
            const sql = `INSERT INTO procurement_document (procurement_id, document_path, created_by) VALUES (?, ?, ?)`;
            await db.query(sql, [procurement_id, document_path, created_by]);
            return true;
        } catch (err) {
            console.error('Error in addProcurementDocumentService: ', err);
            throw err;
        }
    }
    
    static async addDesignateManagerService(payload) {
        try {
            const { procurement_id, designate_manager, created_by } = payload;
    
            // Assuming designate_manager is an array
            const sql = `INSERT INTO procurement_manager (procurement_id, designate_manager, created_by) VALUES (?, ?, ?)`;
            await Promise.all(designate_manager.map(async (manager) => {
                await db.query(sql, [procurement_id, manager, created_by]);
            }));
            return true;
        } catch (err) {
            console.error('Error in addDesignateManagerService: ', err);
            throw err;
        }
    }
    
};