const tutorService = require('../services/tutorService');

async function getAllTutor(req, res) {
    try {
        const tutors = await tutorService.getAllTutor();
        res.status(200).json(tutors);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

async function getTutorById(req, res) {
    const id = req.params.id;
    try {
        const tutor = await tutorService.getTutorById(id);
        if (!tutor) return res.status(404).json({ message: 'Tutor tidak ditemukan' });
        res.status(200).json(tutor);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

async function createTutor(req, res) {
    const tutorData = req.body;
    try {
        const tutorId = await tutorService.createTutor(tutorData);
        res.status(200).json({ message: 'Tutor berhasil dibuat', tutor_id: tutorId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

async function updateTutor(req, res) {
    const id = req.params.id;
    const tutorData = req.body;
    try {
        const updated = await tutorService.updateTutor(id, tutorData);
        if (!updated) return res.status(404).json({ message: 'Tutor tidak ditemukan' });
        res.status(200).json({ message: 'Tutor berhasil diupdate' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

async function deleteTutor(req, res) {
    const id = req.params.id;
    try {
        const deleted = await tutorService.deleteTutor(id);
        if (!deleted) return res.status(404).json({ message: 'Tutor tidak ditemukan' });
        res.status(200).json({ message: 'Tutor berhasil dihapus' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getAllTutor,
    getTutorById,
    createTutor,
    updateTutor,
    deleteTutor
}