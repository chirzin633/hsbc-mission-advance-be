const userService = require('../services/userService');

async function getAllUsers(req, res) {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
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

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};