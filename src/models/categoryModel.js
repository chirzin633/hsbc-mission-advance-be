const db = require('../config/database');

async function getAllCategory() {
    const [rows] = await db.query('SELECT * FROM kategori_kelas');
    return rows;
};

async function getCategoryById(id) {
    const [rows] = await db.query('SELECT * FROM kategori_kelas WHERE kategori_id = ?', [id]);
    return rows[0];
};

async function createCategory(data) {
    const { nama_kategori, deskripsi } = data;
    const [result] = await db.query('INSERT INTO kategori_kelas (nama_kategori, deskripsi) VALUES (?,?)', [nama_kategori, deskripsi]);
    return result.insertId;
};

async function updateCategory(id, data) {
    const { nama_kategori, deskripsi } = data;
    const [result] = await db.query(
        'UPDATE kategori_kelas SET nama_kategori = ?, deskripsi = ? WHERE kategori_id = ?', [nama_kategori, deskripsi, id]
    );
    return result.affectedRows > 0;
};

async function deleteCategory(id) {
    const [result] = await db.query('DELETE FROM kategori_kelase WHERE kategori_id = ?', [id]);
    return result.affectedRows > 0;
};


module.exports = {
    getAllCategory,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
};