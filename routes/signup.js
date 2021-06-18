const express = require('express')
const db = require('../database')
const router = express.Router()

const bcrypt = require('bcrypt');
const saltRounds = 10;

// Sign Up page
router.get('/', (req, res) => {
    res.render('pages/signup', {
        message: req.query.message,
        title: 'Sign up'
    })
})

router.post('/', (req, res) => {

    // Validate fields so that they must require data

    // check whether password and confirm-password are the same
    if (req.body.password != req.body.confirm-password) {
        return res.redirect("/signup?message=Passwords%20don't%20match.")
    }

    // Verify if user email exists, if it does continue with signup
    db.oneOrNone('SELECT * FROM users WHERE email = $1;', [req.body.email])
    .then((existingUser) => {
        if (existingUser) {
            return res.redirect("/signup?message=User%20already%20exists.")
        }
        else {
            const newUser = {
                email: req.body.email.toLowerCase(),
                name: req.body.name,
                password: bcrypt.hashSync(req.body.password, saltRounds)
            }

            db.none('INSERT INTO users(email, name, password) VALUES ($1, $2, $3);',
            [newUser.email, newUser.name, newUser.password])
            .then(() => {
                console.log(newUser)
                res.redirect('/login')
            })
            .catch((err) => {
                // Error if user hasn't been inserted into database
                const message = err.message.replace(/ /g, '%20')
                res.redirect(`/singup?message=${message}`)
            })
        }
    })
    // Error if failed to check whether user email exists
    .catch((err) => {
        return res.send(err.message)
    })
})

router.get('/success', (res, req) => {
    res.render()
})

module.exports = router