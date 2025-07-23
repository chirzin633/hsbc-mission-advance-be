const db = require('../config/database');
const { formatDateTimeWIB } = require('../utils/formatDateWIB');

async function getUserByEmail(email) {
    const [rows] = await db.query('SELECT * FROM user WHERE email = ?', [email]);
    const user = rows[0];
    if (!user) return null;
    user.tgl_regist = formatDateTimeWIB(user.tgl_regist);
    return user;
}

module.exports = {
    getUserByEmail
};