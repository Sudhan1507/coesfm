import { Router } from 'express';
import db from '../../../config/db_config.js';
import authenticateToken from '../../../middlewares/auth.js';

const router = Router();

router.get('/asset', authenticateToken, async (req, res) => {
    const sql = "SELECT * FROM asset";
    try {
        const [result] = await db.query(sql);
        return res.json({ Status: true, Result: result });
    } catch (err) {
        return res.json({ Status: false, Error: "Query Error: " + err });
    }
});

router.post('/add_school', authenticateToken, async (req, res) => {
    const sql = `INSERT INTO school (zone, school_name, address) VALUES (?, ?, ?)`;
    const values = [
        req.body.zone,
        req.body.school_name,
        req.body.address
    ];
    try {
        await db.query(sql, values);
        return res.json({ Status: true });
    } catch (err) {
        return res.json({ Status: false, Error: err });
    }
});

router.get('/school', authenticateToken, async (req, res) => {
    const sql = "SELECT * FROM school";
    try {
        const [result] = await db.query(sql);
        return res.json({ Status: true, Result: result });
    } catch (err) {
        return res.json({ Status: false, Error: "Query Error: " + err });
    }
});

router.get('/school/:id', authenticateToken, async (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM school WHERE id = ?";
    try {
        const [result] = await db.query(sql, [id]);
        return res.json({ Status: true, Result: result });
    } catch (err) {
        return res.json({ Status: false, Error: "Query Error: " + err });
    }
});

router.put('/edit_school/:id', authenticateToken, async (req, res) => {
    const id = req.params.id;
    const sql = `UPDATE school
    SET zone = ?, school_name = ?, address = ?
    WHERE id = ?`;
    const values = [
        req.body.zone,
        req.body.school_name,
        req.body.address
    ];
    try {
        await db.query(sql, [...values, id]);
        return res.json({ Status: true });
    } catch (err) {
        return res.json({ Status: false, Error: "Query Error: " + err });
    }
});

router.delete('/delete_school/:id', authenticateToken, async (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM school WHERE id = ?";
    try {
        await db.query(sql, [id]);
        return res.json({ Status: true });
    } catch (err) {
        return res.json({ Status: false, Error: "Query Error: " + err });
    }
});

// Location routes
router.post('/add_location', authenticateToken, async (req, res) => {
    const sql = `INSERT INTO location
    (locQRID, block, level, room_no, room_name, school_id, school_name) 
    VALUES (?, ?, ?, ?, ?, ?, ?)`;
    const values = [
        req.body.locQRID,
        req.body.block,
        req.body.level,
        req.body.room_no,
        req.body.room_name,
        req.body.school_id,
        req.body.school_name
    ];
    try {
        await db.query(sql, values);
        return res.json({ Status: true });
    } catch (err) {
        return res.json({ Status: false, Error: "Query Error: " + err });
    }
});

router.get('/location/:id', authenticateToken, async (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM location WHERE school_id = ?";
    try {
        const [result] = await db.query(sql, [id]);
        return res.json({ Status: true, Result: result });
    } catch (err) {
        return res.json({ Status: false, Error: "Query Error: " + err });
    }
});

router.get('/locations/:id', authenticateToken, async (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM location WHERE id = ?";
    try {
        const [result] = await db.query(sql, [id]);
        return res.json({ Status: true, Result: result });
    } catch (err) {
        return res.json({ Status: false, Error: "Query Error: " + err });
    }
});

router.put('/edit_location/:id', authenticateToken, async (req, res) => {
    const id = req.params.id;
    const sql = `UPDATE location 
    SET locQRID = ?, block = ?, level = ?, room_no = ?, room_name = ?
    WHERE id = ?`;
    const values = [
        req.body.locQRID,
        req.body.block,
        req.body.level,
        req.body.room_no,
        req.body.room_name
    ];
    try {
        await db.query(sql, [...values, id]);
        return res.json({ Status: true });
    } catch (err) {
        return res.json({ Status: false, Error: "Query Error: " + err });
    }
});

router.delete('/delete_location/:id', authenticateToken, async (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM location WHERE id = ?";
    try {
        await db.query(sql, [id]);
        return res.json({ Status: true });
    } catch (err) {
        return res.json({ Status: false, Error: "Query Error: " + err });
    }
});

export default router;
