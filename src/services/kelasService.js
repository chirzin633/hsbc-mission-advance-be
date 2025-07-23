const kelasModel = require('../models/kelasModel');

async function getAllKelas(query) {
    return await kelasModel.getAllKelas(query);
};

async function getKelasById(id) {
    return await kelasModel.getKelasById(id);
};

async function createKelas(data) {
    return await kelasModel.createKelas(data);
};

async function updateKelas(id, data) {
    return await kelasModel.updateKelas(id, data);
};

async function deleteKelas(id) {
    return await kelasModel.deleteKelas(id);
};

module.exports = {
    getAllKelas,
    getKelasById,
    createKelas,
    updateKelas,
    deleteKelas
};