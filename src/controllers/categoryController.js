const categoryService = require('../services/categoryService');

async function getAllCategory(req, res) {
    try {
        const category = await categoryService.getAllCategory();
        res.status(200).json(category);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

async function getCategoryById(req, res) {
    const id = req.params.id;
    try {
        const category = await categoryService.getCategoryById(id);
        if (!category) return res.status(404).json({ message: "Kategori tidak ditemukan" });
        res.status(200).json(category);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

async function createCategory(req, res) {
    const categoryData = req.body;
    try {
        const categoryId = await categoryService.createCategory(categoryData);
        res.status(200).json({ message: 'Kategori berhasil dibuat', kategori_id: categoryId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

async function updateCateggory(req, res) {
    const id = req.params.id;
    const categoryData = req.body;
    try {
        const updated = await categoryService.updateCategory(id, categoryData);
        if (!updated) return res.status(404).json({ message: 'Kategori tidak ditemukan' });
        res.status(200).json({ message: 'Category berhasil diupdate' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

async function deleteCategory(req, res) {
    const id = req.params.id;
    try {
        const deleted = await categoryService.deleteCategory(id);
        if (!deleted) return res.status(404).json({ message: 'Kategori tidak ditemukan' });
        res.status(200).json({ message: 'Kategori berhasil dihapus' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getAllCategory,
    getCategoryById,
    createCategory,
    updateCateggory,
    deleteCategory
}