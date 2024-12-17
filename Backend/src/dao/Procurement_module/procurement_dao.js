import db from '../../config/db_config.js';

export default class Procurement{

    static async getAllProcurementDao(){
        const sql = `SELECT id,status_name,title,DATE_FORMAT(open_date, '%d/%m/%Y %h:%i %p') AS open_date, 
                     DATE_FORMAT(closing_date, '%d/%m/%Y %h:%i %p') AS closing_date, quotation FROM procurement`;
        try{
            const [rows] = await db.execute(sql);
            return rows;
        }catch(err){
            console.error('Error executing SQL: ', err);
            throw err;
        };
    };

    static async createProcurement(payload) {
        const sql = `INSERT INTO procurement (purchasing_entity, status_name, title, quotation_description, open_date, closing_date, contact_email, created_by)
                     VALUES (?, ?, ?, ?, NOW(), ?, ?, ?)`;
    
        const values = [
            payload.purchasing_entity,
            payload.status_name || 'Open',
            payload.title,
            payload.quotation_description,
            payload.closing_date,
            payload.contact_email,
            payload.created_by
        ];
    
        try {
            const result = await db.query(sql, values);
            return result; // Contains insertId for procurement_id
        } catch (err) {
            console.error('Error executing SQL: ', err);
            throw err;
        }
    }
     
    static async addSupportDocuments(payload){
        const sql =  `INSERT INTO procurement_document(procurement_id,document_name,document_base64)
                      VALUES(?,?,?)`;
        try{
            await db.query(sql, [payload.procurement_id, payload.document_name, payload.document_base64]);
            return true;
        }catch (err) {
            console.error('Error executing SQL: ', err);
            throw err;
        };
    };

    static async addDesignateManager(payload){
        const sql = `INSERT INTO procurement_manager(procurement_id, designate_manager, created_by) 
                      VALUES(?,?,?)`;
        try{
            await db.query(sql, [payload.procurement_id, payload.designate_manager, payload.created_by]);
            return true;
        }catch (err) {
            console.error('Error executing SQL: ', err);
            throw err;
        };
    };
    
};
