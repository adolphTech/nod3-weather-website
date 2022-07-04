const request = require('request')

const forecast = (latitude, longitude, callback) => {
    url = `http://api.weatherstack.com/current?access_key=26aa2893c51821f904881e7044d9865e&query=${latitude},${longitude}&units=m`

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
           
            callback(undefined, body.data.current.weather_descriptions[0] + ' It is currently ' + body.data.current.temperature + ' degress out. ' + body.data.current.feelslike)
        }
    })
}

module.exports = forecast