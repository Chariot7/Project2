const express = require('express');
const router = express.Router();
const wishesCtrl = require('../controllers/wishes');

// GET /users/pool
router.get('/', wishesCtrl.index);
router.post('/', wishesCtrl.newWish);
router.get('/:id', wishesCtrl.showWish)
router.put('/:id', wishesCtrl.edit)
router.delete('/:id', wishesCtrl.delete)
module.exports = router;