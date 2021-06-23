const express = require('express')
const router = express.Router()
const db = require('../database')
const { redirectToLogin } = require('../middlewear')

router.get('/:id(\\d+)', redirectToLogin, (req, res) => {
    db.any('SELECT * FROM schedules where user_id = $1;', req.session.userId)
    .then((schedulesData) => {
        res.render('pages/employeepage', {
            message: req.query.message,
            req: req,
            schedules: schedulesData,
            title: 'Employee Info'
        })
    })
})


module.exports = router