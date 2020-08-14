const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=' + process.env.WEATHERSTACK_API_KEY + '&query='
        + latitude + ',' + longitude

    request({ url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (response.body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, response.body.current.weather_descriptions[0] + '. It is currently '
                + response.body.current.temperature + ' degrees out. It feels like ' + response.body.current.feelslike
                + ' degree out. Their is ' + response.body.current.humidity + '% humidity. Their is '
                + response.body.current.precip + '% chance of rain.')
        }
    })
}

module.exports = forecast