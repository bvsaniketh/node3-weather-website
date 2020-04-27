const request = require('request');

/*
 * Callback Abstraction to call geoCode service
 */

const geoCode = (location, callback) => {
  // Can also concatenate with encodeURIComponent(location)
  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + location + '.json?access_token=pk.eyJ1IjoiYnZzYW5pa2V0aCIsImEiOiJjanUyODdscm4wOXFxNDlwYzhwcmhxNmNlIn0.-ZUurIUvcIKqoAmgFiRsLw';
  request({
    url,
    json: true
    // Destructuring the object here - it was response
  }, (error, {body}) => {
    if (error) {
      callback('Unable to connect with the geolocation service', undefined);
    } else if (body.features.length === 0) {
      callback('Invalid location. Please try with another location name', undefined);
    } else {
      callback(undefined, {
        longitude: body.features[0].center[0],
        latitude: body.features[0].center[1],
        location: body.features[0].place_name
      })
    }
  })

}

module.exports = geoCode;
