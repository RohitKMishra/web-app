const path = require('path')

const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const weatherService = require('./utils/weatherService')

const app = express();
const port = process.env.PORT || 3000


// Define path for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsTemplates = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location

app.set('view engine', 'hbs');
app.set('views', viewsTemplates)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Rohit'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Rohit'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        message: 'To know more please contact us at given address!',
        name: 'Rohit'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please provide an address'
        })

        // res.send({
        //     address: 'You searched for'+req.query.address
        // })
    }
    console.log(req.query.address)

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({
                // Using object shorthand notation
                error
            })
        }
        weatherService(latitude, longitude, (error, data) => {
            if (error) {
                return res.send({
                    error
                })
            }
            res.send({
                forecast: data,
                location: location,
                address: req.query.address
            })
            console.log(location)
            console.log(data)
        })
    })

})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})
app.get('/help/*', (req, res) => {
    res.render('404', {
        error: 'Help article not found',
        title: 404,
        name: 'Rohit'
    })
})


app.get('*', (req, res) => {
    res.render('404', {
        error: 'Page not found',
        title: 404,
        name: 'Rohit'
    })
})

app.listen(port, () => {
    console.log('Server is running on port 3000')
})