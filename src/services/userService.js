const userModel = require('../models/userModel');
const nodemailer = require('nodemailer');

async function getAllUsers() {
    return await userModel.getAllUsers();
}

async function getUserById(id) {
    return await userModel.getUserById(id);
}

async function createUser(data) {
    return await userModel.createUser(data);
}

async function updateUser(id, data) {
    return await userModel.updateUser(id, data);
}

async function deleteUser(id) {
    return await userModel.deleteUser(id);
}

async function sendVerificationEmail(email, token) {
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    });
    const verificationLink = `http://localhost:3000/api/users/verify-email?token=${token}`;

    await transporter.sendMail({
        from: process.env.SMPT_FROM,
        to: email,
        subject: 'Verifikasi Email',
        html: `<p>Klik link berikut untuk verifikasi email anda:</p>
               <a href="${verificationLink}">${verificationLink}</a>`
    })
}

async function verifyUserByToken(token) {
    if (!token) {
        throw new Error('Verification token is required');
    }
    try {
        const user = await userModel.findUserByToken(token);
        if (!user) {
            throw new Error('Invalid or expired verification token');
        }
        await userModel.setUserVerified(user.user_id);
        return user;
    } catch (err) {
        throw new Error(`Failed to verify user: ${error.message}`);
    }
}

async function getFilteredUsers(queryParams) {
    const { role, search, sort } = queryParams;
    const allowedRoles = ['admin', 'siswa', 'tutor', 'user'];

    if (role && !allowedRoles.includes(role)) {
        throw new Error(`Invalid role value. Allowed roles: ${allowedRoles.join(', ')}`);
    }

    if (sort) {
        const [field, order] = sort.split('_');
        const allowedFields = ['name', 'email', 'created_at', 'updated_at'];

        if (!allowedFields.includes(field)) {
            throw new Error(`Invalid sort field. Allowed fields: ${allowedFields.join(', ')}`);
        }

        const allowedOrders = ['asc', 'desc'];
        if (!allowedOrders.includes(order.toLowerCase())) {
            throw new Error(`Invalid sort order. Use 'asc' or 'desc'`);
        }
    }

    const users = await userModel.getFilteredUsers({
        role: role || null,
        search: search || null,
        sort: sort || null
    });

    return {
        success: true,
        count: users.length,
        data: users,
        filters: { role, search, sort }
    };
}

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    sendVerificationEmail,
    verifyUserByToken,
    getFilteredUsers
};


