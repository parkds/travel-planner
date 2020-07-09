//Get the country names through the backend
//Create an asynchronous function to retrieve the country names

const RetrieveCountryData = async() => {
    console.log("Retrieving country names");
    const response = await fetch(__APIHOST__+'/getCountryNames',{
        method: 'GET',
        credentials: 'same-origin',
        headers: {
            'Content-Type':'application/json'
        }
    });
    try {
        const countryNames = await response.json();
        return countryNames
    } catch (error) {
        console.log("error", error)
    }
    
}

var countriesInfo;
//Try just loading when dom is getting loaded
window.addEventListener('load', loadCountries);

//document.getElementById('find-country').addEventListener('click', findCountry);

//Inside that callback function call your async GET request with the parameters:
function loadCountries(e) {
    RetrieveCountryData()
    .then (function(data){
        //First create document fragment which will be added to the select // For efficiencies.
        const countryOptions = document.createDocumentFragment();

        //Add the options to the list of countries.
        for (let i=0; i<data.length; i++) {
            var countryAddition = document.createElement('option');
            countryAddition.setAttribute("value",data[i].countryCode);
            countryAddition.textContent = data[i].countryName;
            
            countryOptions.appendChild(countryAddition)
        }
        document.getElementById('travel-location-country').append(countryOptions)
        document.getElementById('travel-location-country').remove(document.getElementById('travel-location-country')[0]);

    })
    .then(function(data){
        countriesInfo=data;
    })
}

export {loadCountries}