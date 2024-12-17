import db from '../../config/db_config.js';


export default class Vendor{

    static async getAllVendors() {
        const sql = `SELECT * FROM vendor`;

        try {
            const [rows] = await db.execute(sql);
            return rows;
        } catch (err) {
            console.error('Error executing SQL: ', err);
        };
    };

    static async getVendorById(vendorId) {
        const sql = `SELECT * FROM vendor WHERE vendorId = ?`;
        try{
            const [rows] = await db.execute(sql, [vendorId]);
            return rows;
        }catch (err) {
            console.error('Error executing SQL: ', err);
            throw err;
        }
    };
};