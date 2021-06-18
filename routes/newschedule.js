const express = require('express')
const router = express.Router()
const db = require('../database')
const { redirectToLogin } = require('../middlewear')

router.get('/', redirectToLogin, (req, res) => {
    res.render('pages/newschedule', {
        message: req.query.message,
        req: req,
        title: 'Schedules'
    })

})


module.exports = router