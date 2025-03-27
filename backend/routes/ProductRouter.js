const express = require('express');
const router = express.Router();
const ensureAuth = require('../middlewares/Auth');

router.get('/', ensureAuth, (req, res) => { // ✅ Fixed req, res order
    res.status(200).json([
        { name: "mobile", price: 200000 },
        { name: "tv", price: 400000 }
    ]);
});

module.exports = router;
