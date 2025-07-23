const tutorModel = require('../models/tutorModel');

async function getAllTutor() {
    return await tutorModel.getAllTutor();
};

async function getTutorById(id) {
    return await tutorModel.getTutorById(id);
};

async function createTutor(data) {
    return await tutorModel.createTutor(data);
};

async function updateTutor(id, data) {
    return await tutorModel.updateTutor(id, data);
};

async function deleteTutor(id) {
    return await tutorModel.deleteTutor(id);
};

module.exports = {
    getAllTutor,
    getTutorById,
    createTutor,
    updateTutor,
    deleteTutor
}