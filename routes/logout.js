const express = require('express')
const router = express.Router()
const { redirectToLogin } = require('../middlewear')

router.get('/', redirectToLogin, (req, res) => {
    req.session.destroy(function(err) {
        if (err) {
            res.send(err.message)
        }
        else {
            res.clearCookie('login_mrcoffee')
            res.redirect('/login')
        }
    })
})

module.exports = router