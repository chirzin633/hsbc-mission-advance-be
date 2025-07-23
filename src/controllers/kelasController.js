const kelasService = require('../services/kelasService');

async function getAllKelas(req, res) {
    try {
        const kelas = await kelasService.getAllKelas();
        res.status(200).json(kelas);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

async function getKelasById(req, res) {
    const id = req.params.id;
    try {
        const kelas = await kelasService.getKelasById(id);
        if (!kelas) return res.status(404).json({ message: 'Kelas tidak ditemukan' });
        res.status(200).json(kelas);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

async function createKelas(req, res) {
    const kelasData = req.body;
    try {
        const kelasId = await kelasService.createKelas(kelasData);
        res.status(200).json({ message: "Kelas berhasil dibuat", kelas_id: kelasId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

async function updateKelas(req, res) {
    const id = req.params.id;
    const kelasData = req.body;
    try {
        const updated = await kelasService.updateKelas(id, kelasData);
        if (!updated) return res.status(404).json({ message: "Kelas tidak ditemukan" });
        res.status(200).json({ message: "Kelas berhasil diupdate" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

async function deleteKelas(req, res) {
    const id = req.params.id;
    try {
        const deleted = await kelasService.deleteKelas(id);
        if (!deleted) return res.status(404).json({ message: "Kelas tidak ditemukan" });
        res.status(200).json({ message: "Kelas berhasil dihapus" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getAllKelas,
    getKelasById,
    createKelas,
    updateKelas,
    deleteKelas
};