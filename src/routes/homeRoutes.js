const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');

// Define routes
router.get('/', homeController.index);
router.post('/test-swap2',homeController.testSwap2);

module.exports = router;
