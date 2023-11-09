// src/routes/aiInteractionRoutes.js

const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');

router.post('/interact-with-ai', aiController.interactWithAI);

module.exports = router;
