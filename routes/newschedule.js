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
    db.any('SELECT * FROM schedules WHERE user_id = $1;',[newSchedule.user_id])
    .then((data) => {
        for (let i = 0; i < data.length; i++) {
            console.log("Hello2")
            db.any('SELECT (TIME $1, TIME $2) OVERLAPS (TIME $3, TIME $4);', [newSchedule.start_at, newSchedule.end_at, data[i].start_at, data[i].end_at])
            .then((results) => {
                if (results) {
                    console.log("Hello4")
                    console.log(results)
                    return res.redirect("/newschedule?message=Schedule%20overlaps.")
                }
                else {
                    console.log("Testing")
                    db.none('INSERT INTO schedules(user_id, day, start_at, end_at) VALUES ($1, $2, $3, $4);', [newSchedule.user_id, newSchedule.day, newSchedule.start_at, newSchedule.end_at])
                    .then(() => {
                        return res.redirect('/newschedule?message=Schedule%20added!')
                    })
                    .catch((err) => {
                        // Error if user hasn't been inserted into database
                        const message = err.message.replace(/ /g, '%20')
                        return res.redirect(`/newschedule?message=${message}`)
                    })
                }
            })
            .catch((err) => {
                // Error if user hasn't been inserted into database
                const message = err.message.replace(/ /g, '%20')
                return res.redirect(`/newschedule?message=${message}`)
            })
        }
    })
    .catch((err) => {
        // Error if user hasn't been inserted into database
        const message = err.message.replace(/ /g, '%20')
        return res.redirect(`/newschedule?message=${message}`)
    })
})

module.exports = router