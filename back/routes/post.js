const express = require('express');
const router = express.Router();
const postCtrl = require('../controller/post');


// ici je dois ajouter les middleware et controlers

const auth = require('../middleware/auth');




router.post('/',auth,  postCtrl.createPost);
router.put('/:id',auth, postCtrl.modifyPost);
router.delete('/:id',auth, postCtrl.deletePost);
router.get('/all',auth, postCtrl.getAllPost);
router.get('/one',auth, postCtrl.getOnePost);


module.exports = router;