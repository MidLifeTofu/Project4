const express = require('express')
const router = express.Router()
const db = require('../database')

router.get('/', (req, res) => {
    res.render('pages/newschedule', {
        message: req.query.message,
        title: 'Schedules'
    })

})


module.exports = router