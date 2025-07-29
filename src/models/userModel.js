const db = require('../config/database');
const { formatDateTimeWIB } = require('../utils/formatDateWIB');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

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
    const verificationToken = uuidv4();
    const [result] = await db.query(
        `INSERT INTO user (name, jenis_kelamin, email, password, role, tgl_regist,is_verified, verification_token) VALUES (?,?,?,?,?, NOW(),false,?)`, [name, jenis_kelamin, email, hashedPassword, role, verificationToken]
    );
    return { userId: result.insertId, verificationToken };
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

async function findUserByToken(token) {
    if (!token) return null;
    const cleanToken = token.toString().trim();

    const [rows] = await db.query(
        `SELECT user_id, email, verification_token, is_verified 
         FROM user 
         WHERE verification_token = ? AND is_verified = false`,
        [cleanToken]
    );
    return rows[0] || null;
}

async function setUserVerified(userId) {
    await db.query(`UPDATE user SET is_verified = true, verification_token = NULL WHERE user_id = ?`, [userId]);
}

async function updateUserAvatar(userId, avatarPath) {
    const [result] = await db.query(
        'UPDATE user SET avatar = ? WHERE user_id = ?', [avatarPath, userId]
    );
    return result.affectedRows > 0;
}

async function getFilteredUsers(data) {
    const { role, search, sort } = data;
    let query = 'SELECT * FROM user';
    const params = [];
    const conditions = [];

    if (role) {
        conditions.push('role = ?');
        params.push(role);
    }

    if (search) {
        conditions.push('(name LIKE ? OR email LIKE ?)');
        params.push(`%${search}%`, `%${search}%`);
    }

    if (conditions.length > 0) {
        query = query + ' WHERE ' + conditions.join(' AND ');
    }

    if (sort) {
        const [field, order] = sort.split('_');
        query = query + ` ORDER BY ${field} ${order.toUpperCase()}`;
    }

    const [users] = await db.query(query, params);
    return users;
}

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    findUserByToken,
    setUserVerified,
    updateUserAvatar,
    getFilteredUsers
};