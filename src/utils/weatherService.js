const request = require('request');

const weatherService = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=6404bb664c0112f6574a11b26beff70c&query=' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) + '&units=f'

    request({ url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service', undefined)
        } else if (response.body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, `${response.body.current.weather_descriptions[0]}. It is currently ${response.body.current.temperature} degree out. it feels like ${response.body.current.feelslike} degree out `)
        }
    })
}

module.exports = weatherService;
