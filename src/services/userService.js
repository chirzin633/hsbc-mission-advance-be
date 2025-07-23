const userModel = require('../models/userModel');

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

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};


