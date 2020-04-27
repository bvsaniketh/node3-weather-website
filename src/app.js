const request = require('request');
const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geoCode = require('./utils/geoCode.js');
const forecast = require('./utils/forecast.js');

const app = express();
const port = process.env.PORT || 3000

console.log(__dirname);

// Define paths for Express Config
const fileDirectory = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');


// Setting handlebars engine with hbs module already installed
app.set('view engine', 'hbs');

// Customizing the views directory by renaming it to templates
app.set('views', viewsPath);

hbs.registerPartials(partialsPath);
// Required for using static directory of webpages of HTML,CSS and JS
app.use(express.static(fileDirectory));

// app.get('', (req,res) => {
//   res.send('<h1>Weather</h1>');
//   console.log('Welcome to the express home page.');
// })
//


app.get('', (req, res) => {
  res.render('index', {
    title: "Weather",
    pageName: "Home",
    name: "Aniketh Bondada",
    appName: "Weather App"
  });
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: "Weather",
    pageName: "Help",
    name: "Aniketh Bondada",
    age: "24"
  })
  console.log('Welcome to the help page.');
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: "Weather",
    pageName: "About",
    name: "Aniketh Bondada",
    age: "24",
    test: "tagtest"
  })
  console.log('Welcome to the about page. This is express which is a server');
})

app.get('/weather', (req, res) => {
  if(!req.query.address) {
    res.send({error : 'You must provide an address in the search query'});
  }

  // Need to add default parameter as it returns an undefined object which has to be restructured after callback executin
  geoCode(req.query.address, (error,{latitude,longitude,location} = {}) => {
      if(error) {
        // Can use only {error} to implement shorthand usage as both key and value are of same name
        res.send({error:error});
      }
      else {
      forecast(latitude,longitude,(error,forecastData) => {
        if(error) {
          res.send({error:error});
        }
        res.send({forecast: forecastData,
        location,
        address: req.query.address,

      })
  })


  console.log('Welcome to the weather page.');
}})
})

app.get('/products',(req,res) => {
  if(!req.query.search) {
    res.send({
      error : 'You must provide a search query'
    })
  }
  else {
    console.log(req.query);
    res.send({products :[]})
  }
})
app.get('/help/*', (req, res) => {
  res.render('404',{title:"404",name:"Aniketh Bondada",errorMessage:"Help article not found"})
})

app.get('/*', (req, res) => {
  res.render('404',{title:"404",name:"Aniketh Bondada",errorMessage:"Page could not be found"})
  console.log('Error page has been called');
})

app.listen(port, () => {
  console.log('Express is running on port ' + port);
})
