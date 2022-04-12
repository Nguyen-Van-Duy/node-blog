const express = require('express');
// const route = require(".");
const router = express.Router();

const newsController = require('../app/controllers/NewsController');

//cáp con của /news => '/' ~~ '/news'
router.get('/:slug', newsController.show);
router.get('/', newsController.index);

module.exports = router;
