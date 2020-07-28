const express = require('express');
const router = express.Router();
const commentCtrl = require('../controller/comment');


// ici je dois ajouter les middleware et controlers

const auth = require('../middleware/auth');




router.post('/',auth, commentCtrl.createComment);
router.delete('/:id',auth, commentCtrl.deleteComment);
router.get('/post/:id/all',auth, commentCtrl.getAllComment);



module.exports = router;