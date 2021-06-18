const express = require('express')
const router = express.Router()
const db = require('../database')
const { redirectToLogin } = require('../middlewear')

router.get('/', redirectToLogin, (req, res) => {
    db.any('SELECT * FROM users;')
    .then((usersData) => {
        res.render('pages/users', {
            users: usersData,
            req: req,
            title: "Users"
        })
    })
    .catch((err) => {
        res.send(err.message)
    })
})

module.exports = router