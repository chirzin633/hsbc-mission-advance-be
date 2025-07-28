const uploadService = require('../services/uploadService');

async function uploadAvatar(req, res) {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'No uploaded file.'
            });
        }

        const result = await uploadService.handleAvatarUpload(
            req.params.id,
            req.file
        );

        res.status(200).json({
            success: true,
            message: 'File uploaded successfully',
            data: result
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
}

module.exports = { uploadAvatar };