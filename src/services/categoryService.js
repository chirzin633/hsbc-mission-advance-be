const categoryModel = require('../models/categoryModel');

async function getAllCategory() {
    return await categoryModel.getAllCategory();
};

async function getCategoryById(id) {
    return await categoryModel.getCategoryById(id);
};

async function createCategory(data) {
    return await categoryModel.createCategory(data);
};

async function updateCategory(id, data) {
    return await categoryModel.updateCategory(id, data);
};

async function deleteCategory(id) {
    return await categoryModel.deleteCategory(id);
};


module.exports = {
    getAllCategory,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
}