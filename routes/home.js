const express = require('express')
const router = express.Router()
const db = require('../database')
const { redirectToLogin } = require('../middlewear')

// router.get('/', /* redirectToLogin, */ (req, res) => {
//     db.any('SELECT * FROM users;')
//     .then((usersData) => {
//         res.render('pages/home', {
//             users: usersData,
//             schedules: schedulesData,
//             title: "homepage"
//         })
//     })
//     .catch((err) => {
//         res.send(err.message)
//     })
// })

router.get('/', /* redirectToLogin, */ (req, res) => {
    db.any('SELECT * FROM users;')
    .then((usersData) => {
        db.any('SELECT * FROM schedules;')
        .then((schedulesData) => {
            res.render('pages/home', {
                users: usersData,
                schedules: schedulesData,
                title: "homepage"
            })
        })
    })
    .catch((err) => {
        res.send(err.message)
    })
})

module.exports = router