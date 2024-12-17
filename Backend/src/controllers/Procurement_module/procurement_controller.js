import ProcurementService from "../../services/Procurement_module/procurement_service.js";
import fs from 'fs';
import path from 'path';


export default class ProcurementController{

    static async getAllProcurementController(req, res){
        try{
            const procurementData = await ProcurementService.getAllProcurementService();
            return res.status(200).json({status: 'success', data: procurementData});
        }catch(err){
            console.error(err);
            res.status(500).json({ message: 'An error occurred while fetching procurement data.' });
        };
    };

    // Controller for creating procurement
    static async createProcurementController(req, res) {
        try {
            const { purchasing_entity, title, quotation_description, closing_date, contact_email, vendor_data, designate_manager, created_by } = req.body;
            const supporting_documents = req.files ? req.files.supporting_documents : []; // Files uploaded
    
            // Create the procurement entry
            const newProcurementData = await ProcurementService.createProcurementService(req.body);
    
            if (newProcurementData && newProcurementData.procurement_id) {
                const procurement_id = newProcurementData.procurement_id;
    
                // Handle supporting documents (if any)
                if (supporting_documents && supporting_documents.length > 0) {
                    await Promise.all(supporting_documents.map(async (file) => {
                        const filePath = await ProcurementService.saveDocumentFile(file);
                        await ProcurementService.addProcurementDocumentService({ procurement_id, document_path: filePath, created_by });
                    }));
                }
    
                // Handle designate manager(s)
                if (designate_manager && designate_manager.length > 0) {
                    await ProcurementService.addDesignateManagerService({ procurement_id, designate_manager, created_by });
                }
    
                return res.status(201).json({ status: 'success', message: 'Procurement created successfully' });
            } else {
                return res.status(400).json({ status: 'error', message: 'Failed to create procurement' });
            }
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: 'An error occurred while creating a new procurement.' });
        }
    }
    
    static async saveDocumentFile(file) {
        const directoryPath = path.join(process.cwd(), 'src', 'supportingDocuments');
        
        // Create directory if not exists
        if (!fs.existsSync(directoryPath)) {
            fs.mkdirSync(directoryPath, { recursive: true });
        }
    
        // Save file with unique name
        const fileName = `${Date.now()}_${file.name}`;
        const filePath = path.join(directoryPath, fileName);
    
        // Move file to the new directory
        try {
            await file.mv(filePath); // Assuming you're using express-fileupload
            return filePath; // Return the path to store in DB
        } catch (err) {
            console.error('Error saving file: ', err);
            throw err;
        }
    }

    
    

};