const express = require('express')
const router = express.Router()
const db = require('../database')
const { redirectToLogin } = require('../middlewear')

router.get('/:id', redirectToLogin, (req, res) => {
    
    db.any('SELECT * FROM users where id = $1;', req.params.id)
    
        res.render('pages/employeepage', {
        message: req.query.message,
        req: req,
        title: 'Employee Page',
        id: req.params.id
    })
})



module.exports = router