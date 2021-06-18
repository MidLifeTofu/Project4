const express = require('express')
const db = require('../database')
const router = express.Router()

const bcrypt = require('bcrypt');
const saltRounds = 5;

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
    if (req.body.password != req.body.confirmPassword) {
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
                firstname: req.body.name,
                surname: req.body.surname,
                password: bcrypt.hashSync(req.body.password, saltRounds)
            }

            db.none('INSERT INTO users(first_name, surname, email, password) VALUES ($1, $2, $3 $4);',
            [newUser.firstName, newUser.surname, newUser.email, newUser.password])
            .then(() => {
                console.log(newUser)
                res.redirect('/login')
            })
            .catch((err) => {
                // Error if user hasn't been inserted into database
                console.log(err.message)
                console.log(newUser.password)
                const message = err.message.replace(/ /g, '%20')
                res.redirect(`/signup?message=${message}`)
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