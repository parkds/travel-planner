//This is what we use to load the country information once a country is selected.
var countrySelectElement=document.getElementById('travel-location-country')
countrySelectElement.addEventListener('change',findCountryInfo)


//This is the asyncronous function which gets the country info based on the code.
//This is called as part of the event handler of when a different country is selected.
const RetrieveCountryInfo = async(countryCode) => {
    console.log("Retrieving Country Info for countryCode:" + countryCode);
    const response = await fetch(__APIHOST__+'/getCountryInfo/'+countryCode,{
        method:'GET',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    try {
        const countryInfo = await response.json();
        return countryInfo
    } catch (error) {
        console.log("error",error)
    }
}

//This is the asynchrnous function which gets the list of cities.

const RetrieveCountryCityData = async(countryCode) => {
    console.log("Retrieving Country City Data for countryCode:" + countryCode);
    const response = await fetch(__APIHOST__+'/getCountryCityData/'+countryCode,{
        method:'GET',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    try {
        const countryCityInfo = await response.json();
        return countryCityInfo
    } catch (error) {
        console.log("error",error)
    }
}



//This is the event handler which gets invoked when the travel-location-country drop down value changes.
function findCountryInfo(e) {
    console.log("Retrieving Information for "+ countrySelectElement.options[countrySelectElement.selectedIndex].value)

    //First remove the holding area for cities for smoother transition.
    document.getElementById('country-city-display-area').remove();
    //Also remove the holding area for the country pictures
    document.getElementById('country-picture-holder-display').remove();

    RetrieveCountryInfo(countrySelectElement.options[countrySelectElement.selectedIndex].value)
        .then(function(data){
            console.log("Successfully Retrieved Information for" + countrySelectElement.options[countrySelectElement.selectedIndex].value)
            //Set the title of the country info section
            document.getElementById('country-info-title').innerHTML = " Here is some information on " + data[0].countryName;

            document.getElementById('continent').innerHTML = "Continent: " + data[0].continentName;
            document.getElementById('capital').innerHTML = "Capital: " + data[0].capital;
            document.getElementById('population').innerHTML = "Population: " + data[0].countryName;
            document.getElementById('currency').innerHTML = "Currency: " + data[0].currencyCode;

            document.getElementById('country-city-title').innerHTML = "Top recommended cities in " + data[0].countryName;

            //lastly add the trip information div
            document.getElementById('country').innerHTML= "You are traveling to: " + data[0].countryName + " which is in " + data[0].continentName+".";
            //And scroll to the next part
            return data[0].countryName
        })
        //Then retrieve the images related to the country.
        .then(function(countryName){
            console.log("Getting country pictures for "+countryName);
            RetrieveCountryPictures(countryName)
            .then(function(countryPictures){
                addCountryPictures(countryPictures)
            })
        })
        .then(function(){
            let targetSection = document.getElementById('country-picture-title');
            window.scrollTo({
                top: targetSection.offsetTop-100, //This computes the location of the top and scrolls over to the section
                //Use 100 for the navbar offset
                behavior: 'smooth'
        })
    })

    //This part invokes the country city data retrieval and renders it on the DOM.    
    RetrieveCountryCityData(countrySelectElement.options[countrySelectElement.selectedIndex].value)
        .then(function(data){
            addRecommendedCities(data)
        })
}

//Render top 10 largest city names. This is called in the above event handler
function addRecommendedCities(data) {
    //Add back the holding area for the cities
    var displayArea = document.createElement('div');
    displayArea.setAttribute("id",'country-city-display-area');
    document.getElementById('country-city-display-area-holder').append(displayArea);

    const cityList = document.createDocumentFragment();

    //We want to display upto 10 cities but account for countries with less than 10 cities
    var displayCount = Math.min(11,data.length)
 
    for (let i=0; i<displayCount; i++){
        //console.log(data[i].name);
        //console.log(data[i].population);
        var cityAddition = document.createElement('div');
        cityAddition.setAttribute("id",data[i].geonameId);
        cityAddition.setAttribute("class","country-city");
        cityAddition.innerHTML= data[i].name;
        cityAddition.setAttribute("data-lat",data[i].lat)
        cityAddition.setAttribute("data-lng",data[i].lng)
        cityAddition.setAttribute("data-city-name",data[i].name)
        cityAddition.setAttribute("data-city-pop",data[i].population)
        cityAddition.addEventListener('click',displayCityInfo)
        cityList.appendChild(cityAddition)
    }
    document.getElementById('country-city-display-area').append(cityList)
}


//Event handler to be called when you select a city.
function displayCityInfo(e) {
    console.log(event.target.id)
    console.log(event.target.getAttribute('data-lat'));
    console.log(event.target.getAttribute('data-lng'));
    console.log(event.target.getAttribute('data-city-name'));
    console.log(event.target.getAttribute('data-city-pop'));

    //Set the summary section

    document.getElementById('city').innerHTML= "To a city called " + event.target.getAttribute('data-city-name');


    RetrieveCityWeatherInfo(event.target.getAttribute('data-lat'),event.target.getAttribute('data-lng'))
        .then(function(data){

            document.getElementById('city-info').innerHTML = 
            data.weather.description + " is how I would describe the weather in " + data.city_name + ". It is " + 
            data.temp + "degrees Celcius there, but it feels like " + data.app_temp +
            " degrees celcius. The relative humidity is " + data.rh + ". In " + data.city_name +
            ", sun rises at " + data.sunrise + " and sun sets at " + data.sunset +
            ". Hope you enjoy your trip!"

        })
        //Then scroll to the city info section.
        .then(function(data){
            let targetSection = document.getElementById('city-info');
            window.scrollTo({
                top: targetSection.offsetTop-100, //This computes the location of the top and scrolls over to the section
                //Use 100 for the navbar offset
                behavior: 'smooth'
        })
    })

}

//This is the async function to get weather info for the city.
//function to call the backend API to get weather based on lat & long
const RetrieveCityWeatherInfo = async(lat,long) => {
    console.log("Retrieving City Weather Info for" + lat + long);
    const response = await fetch(__APIHOST__+'/getCityWeatherInfo/'+lat+'&'+long,{
        method:'GET',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    try {
        const cityWeatherInfo = await response.json();
        return cityWeatherInfo
    } catch (error) {
        console.log("error",error)
    }
}

//This is the async function to get the country pictures.
const RetrieveCountryPictures = async(country) => {
    console.log("Retrieving country pictures for "+ country);
    const response = await fetch(__APIHOST__+'/getCountryPictures/'+country, {
        method:'GET',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    try {
        const countryPictures = await response.json();
        return countryPictures

    } catch(error){
        console.log("error",error)
    }
}

//This is the function which lets you add the country pictures.
function addCountryPictures(countryPictures){
    if(countryPictures.length==0) {
        console.log("No pictures could be found!")
        
        //Still create the div because we have to remove it later
        var displayArea = document.createElement('div')
        displayArea.setAttribute("id",'country-picture-holder-display');
        document.getElementById('country-picture-holder').append(displayArea);

        //TODO include code to update the DOM to state that no pictures could be found.
    }
    else {
        //First create and add the display area.
        var displayArea = document.createElement('div')
        displayArea.setAttribute("id",'country-picture-holder-display');
        document.getElementById('country-picture-holder').append(displayArea);

        //Also set the country picture title
        document.getElementById('country-picture-title').innerHTML="And here is how it looks like!"

        //Create document fragment to add the pictuers.
        const countryPictureDisplay = document.createDocumentFragment();

        var displayCount = Math.min(12,countryPictures.length);
        
        for (let i=0;i<displayCount; i++){
            var countryPictureAddition = document.createElement('img');
            countryPictureAddition.setAttribute("src",countryPictures[i].webformatURL);
            countryPictureAddition.setAttribute("class","country-picture");
            
            countryPictureDisplay.appendChild(countryPictureAddition)
        }
        document.getElementById('country-picture-holder-display').append(countryPictureDisplay);
    }
}

export { findCountryInfo }
export { addRecommendedCities }
export { displayCityInfo }
export { addCountryPictures }