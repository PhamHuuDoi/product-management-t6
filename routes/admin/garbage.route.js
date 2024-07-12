const express = require('express');
const router = express.Router();
const controller = require('../../controllers/admin/garbage.controller');

router.get('/', controller.index);
router.patch('/undelete/:id', controller.undeleteItem);

module.exports = router;