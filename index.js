const express = require('express')
const morgan = require('morgan')
const expressLayouts = require('express-ejs-layouts')
const session = require('express-session')

const app = express()
const db = require('./database')


//postgres setup
const PORT = process.env.PORT || 3000


//body parser for post requests
app.use(express.json()) 
app.use(express.urlencoded({extended: true}))


// Morgan setup
app.set(morgan('dev'))


// View Engine 
app.set('views', './views')
app.set('view engine', 'ejs')
app.use(expressLayouts)


// sets the public folder to be the start path of public view files
app.use(express.static('public'))


// session
app.use(session({
    cookie: {
        maxAge: 1000 * 60 * 60
    },
    name: 'login_mrcoffee',
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}))


// Routes
const homeRouter = require('./routes/home')
const loginRouter = require('./routes/login')
const signupRouter = require('./routes/signup')
const logoutRouter = require('./routes/logout')
const usersRouter = require('./routes/users')
const newScheduleRouter = require('./routes/newschedule')
const employeeRouter = require('./routes/employeepage')
const errorRouter = require('./routes/error')



app.use('/', homeRouter)
app.use('/users', usersRouter)
app.use('/login', loginRouter)
app.use('/logout', logoutRouter)
app.use('/signup', signupRouter)
app.use('/newschedule', newScheduleRouter)
app.use('/employee', employeeRouter)
app.use('*', errorRouter)


// PORT
app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`)
})