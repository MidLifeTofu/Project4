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

router.post('/', (req, res) => { 
    const newSchedule = {
        user_id: req.session.userId,
        day: req.body.day,
        start_at: req.body.start_at,
        end_at: req.body.end_at,
    }
    console.log(newSchedule)
    if (req.body.day || req.body.start_at || req.body.end_at === '') {
        return res.redirect("/newschedule?message=Missing%20fields.")
    }

   
    
    db.none('INSERT INTO users(user_id, day, start_at, end_at) VALUES ($1, $2, $3, $4);',
    [newSchedule.user_id, newSchedule.day, newSchedule.start_at, newSchedule.end_at])
    .then(() => {
        console.log(newSchedule)
        res.redirect('/')
    })
    .catch((err) => {
        // Error if user hasn't been inserted into database
        const message = err.message.replace(/ /g, '%20')
        res.redirect(`/signup?message=${message}`)
    })
})

module.exports = router