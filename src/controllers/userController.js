const userService = require('../services/userService');
const userModel = require('../models/userModel');

async function getAllUsers(req, res) {
    try {
        const { role, search, sort } = req.query;
        const users = await userService.getFilteredUsers({ role, search, sort });
        res.status(200).json({
            success: true,
            data: users,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
};

async function getUserById(req, res) {
    const id = req.params.id;
    try {
        const user = await userService.getUserById(id);
        if (!user) return res.status(404).json({ message: "User tidak ditemukan" });
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

async function createUser(req, res) {
    const userData = req.body;
    try {
        const userId = await userService.createUser(userData);
        res.status(200).json({ message: 'User berhasil dibuat', user_id: userId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

async function updateUser(req, res) {
    const id = req.params.id;
    const userData = req.body;
    try {
        const updated = await userService.updateUser(id, userData);
        if (!updated) return res.status(404).json({ message: 'User tidak ditemukan' });
        res.status(200).json({ message: 'User berhasil diupdate' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

async function deleteUser(req, res) {
    const id = req.params.id;
    try {
        const deleted = await userService.deleteUser(id);
        if (!deleted) return res.status(404).json({ message: 'User tidak ditemukan' });
        res.status(200).json({ message: 'User berhasil dihapus' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


async function registerUser(req, res) {
    try {
        const { userId, verificationToken } = await userModel.createUser(req.body);
        await userService.sendVerificationEmail(req.body.email, verificationToken);
        res.status(201).json({ message: 'User registered. Please check email to verify.', userId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

async function verifyEmail(req, res) {
    const { token } = req.query;

    if (!token) {
        return res.status(400).json({
            success: false,
            message: 'Verification token is required'
        });
    }
    try {
        const cleanToken = token.toString().trim();
        const user = await userModel.findUserByToken(cleanToken);
        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'Token invalid or expired'
            });
        }
        await userModel.setUserVerified(user.user_id);
        res.status(200).json({
            success: true,
            message: 'Email Anda telah berhasil diverifikasi!',
            data: {
                name: user.name,
                email: user.email
            }
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    registerUser,
    verifyEmail
};