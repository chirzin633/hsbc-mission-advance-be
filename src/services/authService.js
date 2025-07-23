const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { getUserByEmail } = require('../models/authModel');

const JWT_SECRET = 'cirebon-kota-berintan-1962';

async function loginUser(email, password) {
    const user = await getUserByEmail(email);
    if (!user) {
        throw new Error('Email atau password salah')
    }

    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) {
        throw new Error('Email atau password salah');
    }

    const tokenPayload = {
        user_id: user.user_id,
        name: user.name,
        email: user.email,
        role: user.role
    }

    const token = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: '1d' });

    return {
        token,
        user: {
            user_id: user.user_id,
            name: user.name,
            email: user.email,
            role: user.role,
            tgl_regist: user.tgl_regist
        }
    };
}

module.exports = {
    loginUser
}