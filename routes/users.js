const express = require('express')
const router = express.Router()

const db = require('../database')

router.get('/', (req, res) => {
    db.any('SELECT * FROM users;')
    .then((usersData) => {
        res.render('pages/users', {
            users: usersData,
            title: "Users"
        })
    })
    .catch((err) => {
        res.send(err.message)
    })
})

module.exports = router