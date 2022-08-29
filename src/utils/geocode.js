const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoicm9oaXRtaXNocmEiLCJhIjoiY2szdTI5Z3VnMDhnNjNlcTg5NmlvcWNjaSJ9.ht_4vPtDg-638w44UJU71A&limit=1'

    // We are using object shorthand notaion to represent url because key - value name is same "url"
    request({ url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to location service!', undefined)
        } else if (response.body.features[0].length === 0) {
            callback('Unable to find location, Try another search!', undefined)
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode;