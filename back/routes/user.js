const express = require('express');
const router = express.Router();
const userCtrl = require('../controller/user');

const auth = require('../middleware/auth');
/*ajouter les routes */

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.delete('/:id', auth, userCtrl.deleteUser);

module.exports = router;