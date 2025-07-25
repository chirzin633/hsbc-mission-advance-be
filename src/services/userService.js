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
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'jamison.padberg1@ethereal.email',
            pass: 'tCeadAjCawtMyW8jCJ'
        }
    });
    const verificationLink = `http://localhost:3000/api/users/verify-email?token=${token}`;

    await transporter.sendMail({
        from: '"Videobelajar" <no-reply@videobelajar.com>',
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

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    sendVerificationEmail,
    verifyUserByToken
};


