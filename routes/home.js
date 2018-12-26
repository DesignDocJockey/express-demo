
const express = require('express');
const router = express.Router();

router.get('/', (request, response) => {
    response.send('<b>Default Root Route</b>');
});

module.exports = router;