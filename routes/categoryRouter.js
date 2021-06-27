const router = require('express').Router();
const categoryCtrl =require('../controllers/categoryCtrl');



router.post('/createCategory',categoryCtrl.createCategory);


module.exports = router