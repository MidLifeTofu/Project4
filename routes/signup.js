const express = require('express')
const router = express.Router()
const db = require('../database')

router.get('/', (req, res) => {
    res.render('pages/signup', {
        message: req.query.message
    })

})

router.post('/', (req, res) => {

    // TODO: validate form fields


    // check whether password and confirm-password are the same
    if (req.body.password != req.body.confirmPassword) {
        res.redirect('/signup?message=Passwords%20do%20not%20match')
    }
    
    console.log(req.body)

    // TODO: check whether user already exists (check if email is already in db)



    res.redirect('/login')
})

module.exports = router