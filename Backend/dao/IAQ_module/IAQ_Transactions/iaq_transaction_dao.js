import db from '../../../config/db_config.js';

export default class IAQTransaction {
    static async addIaqTransaction(transactionDataArray) {
        const sql = `INSERT INTO iaq_transaction (
            locationSchoolId, locationSchoolName, locationId, locationBlock, locationLevel,
            locationRoomNo, locationRoomName, id, time, pm25, pm10, co2_ppm, temperature, humidity
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        try {
            for (const transactionData of transactionDataArray) {
                const {
                    locationSchoolId, locationSchoolName, locationId, locationBlock, locationLevel,
                    locationRoomNo, locationRoomName, id, time, pm25, pm10, co2_ppm, temperature, humidity
                } = transactionData;
                
                await db.query(sql, [
                    locationSchoolId, locationSchoolName, locationId, locationBlock, locationLevel,
                    locationRoomNo, locationRoomName, id, time, pm25, pm10, co2_ppm, temperature, humidity
                ]);
            }
            return true;
        } catch (error) {
            console.error('Error executing SQL: ', error);
        }
    }

    static async getIaqTransaction() {
        const sql = `SELECT locationSchoolId, locationSchoolName, locationId, locationBlock, locationLevel,
            locationRoomNo, locationRoomName, id,DATE_FORMAT(time,'%d/%m/%Y %h:%i %p' ) AS time, pm25, pm10, co2_ppm, temperature, humidity FROM iaq_transaction`;

        try {
            const [rows] = await db.query(sql);
            return rows;
        } catch (error) {
            console.error('Error executing SQL: ', error);
        }
    }
}
