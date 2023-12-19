const express = require('express');
const contentController = require('./controllers/contentController');

const router = express.Router();

router.post('/contents', contentController.createContent);
router.get('/contents', contentController.getAllContents);
router.get('/contents/:id', contentController.getContentById);
router.put('/contents/:id', contentController.updateContent);
router.delete('/contents/:id', contentController.deleteContent);

module.exports = router;