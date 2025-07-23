const db = require('../config/database');

async function getAllTutor() {
    const [rows] = await db.query(
        `SELECT tutor.*, user.name, user.email FROM tutor JOIN user ON tutor.user_id = user.user_id`
    );
    return rows;
};

async function getTutorById(id) {
    const [rows] = await db.query(
        `SELECT tutor.*, user.name, user.email FROM tutor JOIN user ON tutor.user_id = user.user_id WHERE tutor.tutor_id = ?`, [id]
    );
    return rows[0];
};

async function createTutor(data) {
    const { user_id, pengalaman } = data;
    const [result] = await db.query(
        `INSERT INTO tutor(user_id, pengalaman) VALUES (?,?)`, [user_id, pengalaman]
    );
    return result.insertId;
};

async function updateTutor(id, data) {
    const { pengalaman } = data;
    const [result] = await db.query(
        `UPDATE tutor SET pengalaman = ? WHERE tutor_id = ?`, [pengalaman, id]
    );
    return result.affectedRows > 0;
};

async function deleteTutor(id) {
    const [result] = await db.query(
        `DELETE FROM tutor WHERE tutor_id = ?`, [id]
    );
    return result.affectedRows > 0;
};

module.exports = {
    getAllTutor,
    getTutorById,
    createTutor,
    updateTutor,
    deleteTutor
};