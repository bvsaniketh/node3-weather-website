var request = require('request');

const forecast = (latitude,longitude,callback) => {
  const url = 'https://api.darksky.net/forecast/8c09ddf1aa119b344086294e513c8880/'+latitude+','+longitude+'?units=si&lang=en';
  // Destructuring the response object - it was before response
  request({url,json:true},(error,{body}) => {
    if(error) {
      callback('Service not available. Please try after some time',undefined);
    }
    else if(body.error) {
      callback('Invalid coordinates. Please try with a different set of coordinates',undefined)
    }
    else {
      callback(undefined,`The timezone of the city is ${body.timezone}. The summary of the weather is ${body.daily.summary} There is ${body.currently.precipProbability}% of rain.`);
    }
  });
}

module.exports = forecast;
