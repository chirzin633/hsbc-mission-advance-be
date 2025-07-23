const db = require('../config/database');
const { formatDateTimeWIB } = require('../utils/formatDateWIB');
const bcrypt = require('bcrypt');

async function getAllUsers() {
    const [rows] = await db.query('SELECT * FROM user');
    const formattedUsers = rows.map(user => ({
        ...user, tgl_regist: formatDateTimeWIB(user.tgl_regist)
    }));
    return formattedUsers;
};

async function getUserById(id) {
    const [rows] = await db.query('SELECT * FROM user WHERE user_id = ?', [id]);
    const user = rows[0];
    if (!user) return null;
    user.tgl_regist = formatDateTimeWIB(user.tgl_regist);
    return user;
}

async function createUser(data) {
    if (!data || typeof data !== 'object') {
        throw new Error('Data must be an object');
    }
    const { name, jenis_kelamin, email, password, role } = data;
    if (!name || !jenis_kelamin || !email || !password || !role) {
        throw new Error('Data cannot be empty');
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const [result] = await db.query(
        `INSERT INTO user (name, jenis_kelamin, email, password, role, tgl_regist) VALUES (?,?,?,?,?, NOW())`, [name, jenis_kelamin, email, hashedPassword, role]
    );
    return result.insertId;
}

async function updateUser(id, data) {
    if (!data || typeof data !== 'object') {
        throw new Error('Data must be an object');
    }
    const { name, jenis_kelamin, email, password, role } = data;

    if (!name || !jenis_kelamin || !email || !password || !role) {
        throw new Error('Required fields: name, email, gender, role');
    }
    let hashedPassword = null;
    if (password) {
        const saltRounds = 10;
        hashedPassword = await bcrypt.hash(password, saltRounds);
    }
    const [result] = await db.query(
        `UPDATE user SET name = ?, jenis_kelamin = ?, email = ?, password = ?, role = ? WHERE user_id = ?`, [name, jenis_kelamin, email, hashedPassword, role, id]
    );
    return result.affectedRows > 0;
};

async function deleteUser(id) {
    const [result] = await db.query(
        `DELETE FROM user WHERE user_id = ?`, [id]
    );
    return result.affectedRows > 0;
}

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};