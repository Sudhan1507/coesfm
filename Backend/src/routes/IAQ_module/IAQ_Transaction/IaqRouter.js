import {Router} from "express";
import db from "../../../config/db_config.js";
import authenticateToken from '../../../middlewares/auth.js';


const router =Router();


router.post('/addSensorData', authenticateToken, async (req, res) => {
  const { schoolName, block, level, RoomNo, RoomName, data } = req.body;

  if (!data || !Array.isArray(data)) {
      return res.status(400).send({ error: 'Invalid data format' });
  }

  const query = `
      INSERT INTO sensor_data (schoolName, block, level, RoomNo, RoomName, device_id, time, pm25, pm10, co2_ppm, temperature, humidity )
      VALUES ?
  `;

  const values = data.map(entry => [
      schoolName,
      block,
      level,
      RoomNo,
      RoomName,
      entry.device_id,
      entry.time,
      entry.pm25,
      entry.pm10,
      entry.co2_ppm,
      entry.temperature,
      entry.humidity,
  ]);

  try {
      await db.query(query, [values]);
      res.status(200).send({ message: 'Data inserted successfully' });
  } catch (err) {
      console.error("Database error:", err);
      res.status(500).send({ error: 'Failed to insert data' });
  }
});


// API endpoint to fetch sensor data based on filters
router.get('/getSensorData', authenticateToken, async (req, res) => {
  try {
      const { schoolName, block, level, RoomNo, month, year, device_id } = req.query;

      // Create the base query
      let query = `SELECT * FROM sensor_data WHERE 1=1`;
      const queryParams = [];

      // Apply filters dynamically
      if (schoolName) {
          query += ` AND schoolName = ?`;
          queryParams.push(schoolName);
      }
      if (block) {
          query += ` AND block = ?`;
          queryParams.push(block);
      }
      if (level) {
          query += ` AND level = ?`;
          queryParams.push(level);
      }
      if (RoomNo) {
          query += ` AND RoomNo = ?`;
          queryParams.push(RoomNo);
      }
      if (device_id) {
          query += ` AND device_id = ?`;
          queryParams.push(device_id);
      }
      if (month) {
          query += ` AND MONTH(time) = ?`;
          queryParams.push(month);
      }
      if (year) {
          query += ` AND YEAR(time) = ?`;
          queryParams.push(year);
      }

      // Execute the query with parameters
      const [results] = await db.query(query, queryParams);
      res.json(results);
  } catch (err) {
      console.error(err);
      res.status(500).send('Error fetching data');
  }
});


export default router;