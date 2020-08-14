const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('../utils/geocode.js')
const forecast = require('../utils/forecast.js')

const app = express()
const port = process.env.PORT

// Define paths for EXpress config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Suyash Jain'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Suyash Jain'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpText: 'This is some helpful text.',
        name: 'Suyash Jain'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecast) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Help Article not found',
        name: 'Suyash Jain'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'My 404 Page',
        name: 'Suyash Jain'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})