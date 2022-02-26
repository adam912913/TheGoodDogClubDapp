const express = require('express')
const router = express.Router();
const whitelistCtrl = require('../controllers/whitelist.controller')

// verify white list at whitelist.controller
router.route('/verifywhitelist').post((req, res) => {
    whitelistCtrl.verify(req, res);
});

// verify white list at whitelist.controller
router.route('/get_merkle_root').post((req, res) => {
    whitelistCtrl.get_merkle_root(req, res);
});

module.exports = router