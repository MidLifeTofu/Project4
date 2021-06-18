const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000

//postgres setup
const db = require('./database')        // TODO: double check these paths
const client = require('./database')

//body parser for post requests
app.use(express.json()) 
app.use(express.urlencoded({extended: true}))

//sets the template to ejs
app.set('view engine', 'ejs')

// sets the public folder to be the start path of public view files
app.use(express.static('public'))

// router files
const loginRouter = require('./routes/login')
const signupRouter = require('./routes/signup')
const newScheduleRouter = require('./routes/newschedule')

// routes
app.use('/login', loginRouter)
app.use('/signup', signupRouter)
app.use('/newschedule', newScheduleRouter)

// LOGIN PAGE
app.get('/', (req, res) => {
    res.render('pages/login')
})


app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`)
})