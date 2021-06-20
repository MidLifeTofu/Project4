const express = require('express')
const db = require('../database')
const router = express.Router()

const bcrypt = require('bcrypt');
const saltRounds = 5;

// Sign Up page
router.get('/', (req, res) => {
    res.render('pages/signup', {
        message: req.query.message,
        req: req,
        title: 'Sign up'
    })
})

router.post('/', (req, res) => {

    // Validate fields so that they must require data

    document.addEventListener("DOMContentLoaded", () => {
    
        const formButton = document.querySelector("form")
        const formName = document.querySelector("#name");
        const formSurname = document.querySelector("#surname");
        const formEmail = document.querySelector("#email");

        formButton.onsubmit = (e) => {
            e.preventDefault()
            
            console.log("Validation Start")

            //name validation
        const nameValid = /^[A-Za-zÀ-ÖØ-öø-ÿ \-']+$/i.test(formName.value)
            if (nameValid === true) { 
                console.log("Name is valid!")
            } else {
                console.log("That's not a valid name")
            }
        
        const surnameValid = /^[A-Za-zÀ-ÖØ-öø-ÿ \-']+$/i.test(formSurname.value)
            if (surnameValid === true) { 
                console.log("Name is valid!")
            } else {
                console.log("That's not a valid name")
            }

            //email validation
        const emailValid = /^[a-zA-Z0-9\-_]+[a-zA-Z0-9\-_\.]*@[a-zA-Z0-9\-_]+\.[a-zA-Z0-9\-_\.]+$/.test(formEmail.value)

            if (emailValid === true) { 
                console.log("Email is valid!")
            } else {
                console.log("That's not a valid email")
            }

            //validation test, if all are valid, present requested info
            if (nameValid && surnameValid && emailValid) {
                console.log({
                    Name: formName.value,
                    Surname: formSurname.value,
                    Email: formEmail.value
                })
            } else {
                console.log("Something is not valid")
            }
        }
    })


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
                firstName: req.body.name,
                surname: req.body.surname,
                password: bcrypt.hashSync(req.body.password, saltRounds)
            }

            db.none('INSERT INTO users(first_name, surname, email, password) VALUES ($1, $2, $3, $4);',
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