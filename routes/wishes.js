const express = require('express');
const router = express.Router();
const wishesCtrl = require('../controllers/wishes');

// GET /users/pool
router.post('/pool', wishesCtrl.newWish);
router.get('/pool/:id', wishesCtrl.showWish)
router.put('/pool/:id', wishesCtrl.edit)

module.exports = router;