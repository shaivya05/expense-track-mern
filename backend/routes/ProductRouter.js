// const express = require('express');
// const router = express.Router();
// const ensureAuth = require('../middlewares/Auth');

// router.get('/', ensureAuth, (req, res) => { // ✅ Fixed req, res order
//     res.status(200).json([
//         { name: "mobile", price: 200000 },
//         { name: "tv", price: 400000 }
//     ]);
// });

// module.exports = router;
const ensureAuth= require('../middlewares/Auth');

const router = require('express').Router();

router.get('/', ensureAuth, (req, res) => {
    console.log('---- logged in user detail ---', req.user);
    res.status(200).json([
        {
            name: "mobile",
            price: 10000
        },
        {
            name: "tv",
            price: 20000
        }
    ])
});

module.exports = router;