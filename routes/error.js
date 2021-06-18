const express = require('express')
const router = express.Router()

// 404 error
router.get('/', (req, res) => {
    res.status(404).render('pages/error', {
        title: 'Error',
        message: req.query.message
    })
})

module.exports = router