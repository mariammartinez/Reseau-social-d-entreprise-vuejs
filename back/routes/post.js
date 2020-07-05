const express = require('express');
const router = express.Router();
const postCtrl = require('../controller/post');


/* ici je dois ajouter les middleware et controlers

const auth = require('../middleware/auth');
const saucesCtrl = require('../controller/sauces');
const multer = require('../middleware/multer-config');*/



router.post('/',postCtrl.createPost);
router.put('/:id',postCtrl.modifyPost);
router.delete('/:id',postCtrl.deletePost);
router.get('/all',postCtrl.getAllPost);
router.get('/one',postCtrl.getOnePost);


module.exports = router;