const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send("profile api working");
})

module.exports = router;