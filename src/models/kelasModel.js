const db = require('../config/database');

async function getAllKelas(query = {}) {
    let baseQuery = `SELECT
      kelas.kelas_id,
      kelas.nama_kelas,
      kelas.deskripsi,
      kelas.harga,
      kelas.level,
      kategori_kelas.nama_kategori,
      user.name AS tutor_name,
      tutor.pengalaman
    FROM kelas
    JOIN kategori_kelas ON kelas.kategori_id = kategori_kelas.kategori_id
    JOIN tutor ON kelas.tutor_id = tutor.tutor_id
    JOIN user ON tutor.user_id = user.user_id
    WHERE 1=1
    `;

    const params = [];
    // search
    if (query.search) {
        const searchTerm = `%${query.search.trim()}%`;
        baseQuery += ` AND (kelas.nama_kelas LIKE ? OR kelas.deskripsi LIKE ?)`;
        params.push(searchTerm, searchTerm);
    }

    // filter
    if (query.kategori_id) {
        baseQuery += ` AND kelas.kategori_id = ?`;
        params.push(query.kategori_id);
    }
    // filter
    if (query.level) {
        baseQuery += ` AND kelas.level = ? `;
        params.push(query.level)
    }

    // sort
    let orderBy = 'kelas.kelas_id DESC'; // default
    if (query.sort) {
        const [field, direction] = query.sort.split(':');
        const sortFieldMap = {
            nama_kelas: 'kelas.nama_kelas',
            harga: 'kelas.harga',
            level: 'kelas.level',
            nama_kategori: 'kategori_kelas.nama_kategori',
            tutor_name: 'user.name'
        };

        const sortField = sortFieldMap[field] || 'kelas.kelas_id';
        const sortDirection = direction === 'asc' ? 'ASC' : 'DESC';
        orderBy = `${sortField} ${sortDirection}`;
    }

    baseQuery += ` ORDER BY ${orderBy}`;

    const [rows] = await db.query(baseQuery, params);
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