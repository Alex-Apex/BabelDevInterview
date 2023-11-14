// src/routes/aiInteractionRoutes.js

const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');

// Handle the form submission
router.post('/submit-answer', aiController.submitAnswer);

router.post('/submit-speech',aiController.submitSpeech);

module.exports = router;
