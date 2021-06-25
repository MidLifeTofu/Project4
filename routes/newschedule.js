const express = require('express')
const router = express.Router()
const db = require('../database')
const { redirectToLogin } = require('../middlewear')



router.get('/', redirectToLogin, (req, res) => {
    db.any('SELECT * FROM schedules where user_id = $1 ORDER BY day, start_at;', req.session.userId)
    .then((schedulesData) => {
        res.render('pages/newschedule', {
            message: req.query.message,
            req: req,
            schedules: schedulesData,
            title: 'Schedules',
            db: db
        })
    })
    .catch((err) => {
        res.send(err.message)
    })
})

router.post('/delete/:id(\\d+)', redirectToLogin, (req, res) => {
    db.none('DELETE FROM schedules WHERE id = $1 AND user_id = $2;', [req.params.id, req.session.userId])
    .then(() => {
        return res.redirect('/newschedule?message=Schedule%20deleted.')
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

    let overlap = false

    // Cats solution that works
    db.any('SELECT * FROM schedules WHERE user_id = $1 AND day = $2;',[newSchedule.user_id, newSchedule.day])
    .then((data) => {
        for (let i = 0; i < data.length; i++) {
            if (
                (
                (req.body.start_at >= data[i].start_at) && (req.body.start_at < data[i].end_at))
                ||
                ((req.body.end_at <= data[i].end_at) && (req.body.end_at > data[i].start_at))
                ||
                ((req.body.start_at < data[i].start_at) && (req.body.end_at > data[i].end_at))
            ) {
                overlap = true
            }
        }    
        if (overlap) {
            return res.redirect("/newschedule?message=Schedule%20overlaps.")
        }
        else {
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

    // Original method, does what I want but keeps reloading the page due to the loop
    // db.any('SELECT * FROM schedules WHERE user_id = $1;',[newSchedule.user_id])
    // .then((data) => {
    //     for (let i = 0; i < data.length; i++) {
    //         db.any('SELECT (TIME $1, TIME $2) OVERLAPS (TIME $3, TIME $4);', [newSchedule.start_at, newSchedule.end_at, data[i].start_at, data[i].end_at])
    //         .then((results) => {
    //             if (results) {
    //                 return res.redirect("/newschedule?message=Schedule%20overlaps.")
    //             }
    //             else {
    //                 db.none('INSERT INTO schedules(user_id, day, start_at, end_at) VALUES ($1, $2, $3, $4);', [newSchedule.user_id, newSchedule.day, newSchedule.start_at, newSchedule.end_at])
    //                 .then(() => {
    //                     return res.redirect('/newschedule?message=Schedule%20added!')
    //                 })
    //                 .catch((err) => {
    //                     // Error if user hasn't been inserted into database
    //                     const message = err.message.replace(/ /g, '%20')
    //                     return res.redirect(`/newschedule?message=${message}`)
    //                 })
    //             }
    //         })
    //         .catch((err) => {
    //             // Error if user hasn't been inserted into database
    //             const message = err.message.replace(/ /g, '%20')
    //             return res.redirect(`/newschedule?message=${message}`)
    //         })
    //     }
    // })  
    // .catch((err) => {
    //     // Error if user hasn't been inserted into database
    //     const message = err.message.replace(/ /g, '%20')
    //     return res.redirect(`/newschedule?message=${message}`)
    // })

    
})

module.exports = router