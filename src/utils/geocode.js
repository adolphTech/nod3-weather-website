const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiYW5kcmV3bWVhZDEiLCJhIjoiY2pvOG8ybW90MDFhazNxcnJ4OTYydzJlOSJ9.njY7HvaalLEVhEOIghPTlw&limit=1'

    request({ url, json: true }, (error, {data}) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)}
        // } else if (data.features.length === 0) {
        //     callback('Unable to find location. Try another search.', undefined)
         else {
            callback(undefined, {
                latitude: data.features[0].center[1],
                longitude: data.features[0].center[0],
                location: data.features[0].place_name
            })
        }
    })
}

module.exports = geocode