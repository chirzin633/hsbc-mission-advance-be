const express = require('express');
const router = express.Router();
const kelasController = require('../controllers/kelasController');

router.get('/kelas', kelasController.getAllKelas);
router.get('/kelas/:id', kelasController.getKelasById);
router.post('/kelas', kelasController.createKelas);
router.put('/kelas/:id', kelasController.updateKelas);
router.delete('/kelas/:id', kelasController.deleteKelas);

module.exports = router;
