const dotenv = require('dotenv');
dotenv.config();

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
//This lets us use the parser 
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); //We tell how we want our data to be handled.

// Cors for cross origin allowance //Let browser and server talk to each other.
const cors = require('cors')

// Initialize the main project folder
app.use(express.static('dist')); //Connects the website which has the static contents. // Specify them as dist here since we are using the built version.
//use() method is used to connect project dependencies
app.use(cors());


const fetch = require("node-fetch");




//listen to the env port - for heroku deployment
app.listen(process.env.PORT,listening);

if (process.env.PORT == undefined) {
    console.log("Port number undefined, running on 9292")
    app.listen(9292, function () {
        console.log('Example app listening on port 9292!')
    })
}

module.exports = app;


function listening() {
    console.log("server is running");
    //console.log(`server is running on localhost: ${port}`);
}
//const server = app.listen(port, () => {console.log(`running on localhost: ${port}`)})

//Set get method to serve the base page

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

//GEONAMES API start

var hasCountryData = false;
var countryData; //Global variable to store the country data information
const geoNamesBaseURL = 'http://api.geonames.org/'
const WebServiceName = 'countryInfoJSON?'
const username = 'username=' + process.env.GEONAMES_USER_ID

// geoNamesBaseURL+WebServiceName+username

//Function to get the country names

//Retrieves country data via an API and returns the list of country data.
//If the information already exists on the server, returns the list of country data from server.
const getCountryData = async (geoNamesBaseURL, WebServiceName, username) => {
    if (hasCountryData == false) {
        console.log("Doesn't have country data. Fetching via api.")
        const res = await fetch(geoNamesBaseURL + WebServiceName + username)
        countryData = await res.json();
        hasCountryData = true
        //console.log(countryData);
    } else {
        console.log("Has the country data, returning from server")
    }
    return countryData.geonames;

}

app.get("/getCountryNames", function (req, res) {
    console.log("Getting country names via API");
    getCountryData(geoNamesBaseURL, WebServiceName, username)
        .then(function (data) {
            res.send(data); //response is sent using .send() method.
        })
})


//GET API for getting the country info based on country code.
app.get("/getCountryInfo/:countryCode", function (req, res) {
    console.log("Getting country info for" + req.params.countryCode);

    //First get the country data - from local
    getCountryData(geoNamesBaseURL, WebServiceName, username)
        .then(function(data){
            res.send(data.filter(data => data.countryCode == req.params.countryCode))
        })
    })


//GET API for getting the list of cities based on country code.
app.get("/getCountryCityData/:countryCode", function (req,res){
    console.log("Getting City Info for " + req.params.countryCode);
    getCountryCityData(geoNamesBaseURL,countryCityWebServiceName,req.params.countryCode,countryCityWebServiceParams,username)
        .then( function (data) {
            res.send(data);
        })
})


//Asynchronous Function to be called by the get api which retrieves the city info.
const countryCityWebServiceName = 'searchJSON?country='
const countryCityWebServiceParams = '&featureClass=P&'

const getCountryCityData = async(geoNamesBaseURL,countryCityWebServiceName,countryCode,countryCityWebServiceParams,username) => {
    const results = await fetch (geoNamesBaseURL+countryCityWebServiceName+countryCode+countryCityWebServiceParams+username)
    countryCityData = await results.json();
    return countryCityData.geonames
}

//GEONAMES API END


// WEATHER BITS API
//Endpoints related to the weather bits API.

//Get the weather
//Asynchronous function to be called by the get api. To retrieve the weather based on the lng and lat.
const weatherbitBaseURL='https://api.weatherbit.io/v2.0/'
const weatherbitWebServiceName='current?'
const param1 = 'lat='
const param2 = '&lon='
const weatherbitsApikey = '&key='+process.env.WEATHERBITS_API_KEY

const getCityWeatherInfo = async(weatherbitBaseURL, weatherbitWebServiceName,param1,lat,param2,lng,weatherbitsApikey) => {
    const results = await fetch (weatherbitBaseURL + weatherbitWebServiceName + param1 + lat + param2 + lng + weatherbitsApikey)
    
    cityWeatherInfo = await results.json();
    return cityWeatherInfo.data[0]; 
}

//http://api.weatherbit.io/v2.0/forecast/current?lat={lat}&lon={lon}

//GET API for getting the weather info based on lat and long
app.get("/getCityWeatherInfo/:lat&:lng", function (req,res){
    console.log("Getting Weather Info");
    getCityWeatherInfo(weatherbitBaseURL, weatherbitWebServiceName,param1,req.params.lat,param2,req.params.lng,weatherbitsApikey)
        .then( function (data) {
            res.send(data);
        })
})

// WEATHER BITS API END


// PIXABAY API

//https://pixabay.com/api/?key=APIKEY&q=korea&category=places&image_type=photo
const pixabayBaseURL='https://pixabay.com/api/';
const pixabayApikey='?key='+process.env.PIXABAY_API_KEY+'&q=';
const pixabay_params = '&category=places&image_type=photo'

//GET end point to get the picture info based on the country name retrieval
app.get("/getCountryPictures/:countryName", function (req,res){
    console.log("Getting country picture info");
    getCountryPictures(pixabayBaseURL,pixabayApikey,req.params.countryName,pixabay_params)
        .then(function(data){
            res.send(data);
        })
})

//Asynchronous function to retrieve the images via pixabay API.

const getCountryPictures = async (pixabayBaseURL,pixabayApikey,countryName,pixabay_params) => {
    const results = await fetch (pixabayBaseURL + pixabayApikey + countryName + pixabay_params)
    countryPictures = await results.json()
    return countryPictures.hits
}

// PIXABAY API END

