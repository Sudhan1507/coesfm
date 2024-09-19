import db from '../../config/db_config.js';

export default class Procurement{

    static async getAllProcurementDao(){
        const sql = `SELECT id,status_name,title,DATE_FORMAT(open_date, '%r') AS open_date, 
                     DATE_FORMAT(closing_date, '%r') AS closing_date, quotation FROM procurement`;
        try{
            const [rows] = await db.execute(sql);
            return rows;
        }catch(err){
            console.error('Error executing SQL: ', err);
            throw err;
        };
    };

    static async createProcurement(){
        const payload =[ purchasing_entity,title,quotation_description,open_date,closing_date,created_by];
        const sql =`INSERT INTO procurement(purchasing_entity,status_name,title,quotation_description,open_date,closing_date,created_by)
                    VALUES(?,?,?,?,?,?,?)`;
        
        try{
            await db.query(sql, payload);
            return true;
        }catch(err){
            console.error('Error executing SQL: ', err);
            throw err;
        };
    }
};
