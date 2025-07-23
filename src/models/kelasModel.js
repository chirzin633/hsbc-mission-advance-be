const db = require('../config/database');

async function getAllKelas() {
    const [rows] = await db.query(
        // `SELECT kelas.*, kategori_kelas.nama_kategori, tutor.user_id AS tutor_user_id FROM kelas LEFT JOIN kategori_kelas ON kelas.kategori_id = kategori_kelas.kategori_id LEFT JOIN tutor ON kelas.tutor_id = tutor.tutor_id`
        `SELECT
         kelas.kelas_id,
         kelas.nama_kelas,
         kategori_kelas.nama_kategori,
         kelas.deskripsi,
         kelas.level,
         kelas.harga,
         user.name AS tutor_name,
         tutor.pengalaman
         FROM kelas
         JOIN kategori_kelas ON kelas.kategori_id = kategori_kelas.kategori_id
         JOIN tutor ON kelas.tutor_id = tutor.tutor_id
         JOIN user ON tutor.user_id = user.user_id`
    );
    return rows;
};

async function getKelasById(id) {
    const [rows] = await db.query(
        `SELECT
         kelas.kelas_id,
         kelas.nama_kelas,
         kategori_kelas.nama_kategori,
         kelas.deskripsi,
         kelas.level,
         kelas.harga,
         user.name AS tutor_name,
         tutor.pengalaman
         FROM kelas
         JOIN kategori_kelas ON kelas.kategori_id = kategori_kelas.kategori_id
         JOIN tutor ON kelas.tutor_id = tutor.tutor_id
         JOIN user ON tutor.user_id = user.user_id
         WHERE kelas.kelas_id = ?`, [id]
    );
    return rows[0];
};

async function createKelas(data) {
    const { nama_kelas, deskripsi, harga, level, tutor_id, kategori_id } = data;
    const [result] = await db.query(
        `INSERT INTO kelas (nama_kelas, deskripsi, harga, level, tutor_id, kategori_id) VALUES (?,?,?,?,?,?)`, [nama_kelas, deskripsi, harga, level, tutor_id, kategori_id]
    );
    return result.insertId;
};

async function updateKelas(id, data) {
    const { nama_kelas, deskripsi, harga, level, tutor_id, kategori_id } = data;
    const [result] = await db.query(
        `UPDATE kelas SET nama_kelas = ?, deskripsi = ?, harga = ?, level = ?, tutor_id = ?, kategori_id = ? WHERE kelas_id = ?`, [nama_kelas, deskripsi, harga, level, tutor_id, kategori_id, id]
    );
    return result.affectedRows > 0;
};

async function deleteKelas(id) {
    const [result] = await db.query(
        `DELETE FROM kelas WHERE kelas_id = ?`, [id]
    );
    return result.affectedRows > 0;
};

module.exports = {
    getAllKelas,
    getKelasById,
    createKelas,
    updateKelas,
    deleteKelas
};