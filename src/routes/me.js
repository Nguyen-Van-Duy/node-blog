const express = require('express');
// const route = require(".");
const router = express.Router();

const meController = require('../app/controllers/MeController');

//cáp con của /me => '/' ~~ '/me'
router.get('/stored/courses', meController.storedCourses);
router.get('/trash/courses', meController.trashCourses);


module.exports = router;
