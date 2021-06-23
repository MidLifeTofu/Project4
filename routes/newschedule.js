const express = require('express')
const router = express.Router()
const db = require('../database')
const { redirectToLogin } = require('../middlewear')

router.get('/', redirectToLogin, (req, res) => {
    db.any('SELECT * FROM schedules where user_id = $1;', req.session.userId)
    .then((schedulesData) => {
        res.render('pages/newschedule', {
            message: req.query.message,
            req: req,
            schedules: schedulesData,
            title: 'Schedules'
        })
    })
})

router.post('/', (req, res) => { 
    const newSchedule = {
        user_id: req.session.userId,
        day: req.body.day,
        start_at: req.body.start_at,
        end_at: req.body.end_at,
    }
    if ((req.body.start_at || req.body.end_at) === '') {
        return res.redirect("/newschedule?message=Missing%20fields.")
    }
    if (req.body.start_at > req.body.end_at) {
        return res.redirect("/newschedule?message=Start%20time%20cannot%20be%20greater%20than%20end%20time.")
    }
    // if (db.none('SELECT (start_at, end_at) VALUES ($1, $2) OVERLAPS * FROM schedules;', [newSchedule.start_at, newSchedule.end_at])) {

    // }
    else {
         db.none('INSERT INTO schedules(user_id, day, start_at, end_at) VALUES ($1, $2, $3, $4);',
        [newSchedule.user_id, newSchedule.day, newSchedule.start_at, newSchedule.end_at])
        .then(() => {
            res.redirect('/newschedule?message=Schedule%20added!')
        })
        .catch((err) => {
            // Error if user hasn't been inserted into database
            const message = err.message.replace(/ /g, '%20')
            res.redirect(`/newschedule?message=${message}`)
        })
    }
})

module.exports = router