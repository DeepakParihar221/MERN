const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send("posts api working");
})

module.exports = router;