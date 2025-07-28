const userModel = require('../models/userModel');
const fs = require('fs');
const path = require('path');

async function handleAvatarUpload(userId, file) {
    if (!file) {
        throw new Error('No file uploaded.');
    }

    const avatarPath = file.path;
    const publicUrl = `/upload/${path.basename(avatarPath)}`;

    await userModel.updateUserAvatar(userId, publicUrl);

    return {
        originalName: file.originalName,
        filename: file.filename,
        path: publicUrl,
        size: file.size
    };
}

module.exports = { handleAvatarUpload }