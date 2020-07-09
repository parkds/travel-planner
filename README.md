# The Travel Scheduler App

### Application Flow
Travel scheduler app lets the users select the dates when they want to travel. The user can then select a country which they want to visit. The app shows a brief information about the country such as the capital and the continent, a few pictures of the country along with a list of large cities in the country. The user can then select one of the cities as their destination. Once the user selects the city they want to visit, the app shows information about the city such as sunrise time, sunset time, weather, temperature, and the perceived temperature.

### APIs
Several APIs were used to create this application.

- [GEONAMES API] was used to get the list of countries along with the list of large cities with in that country. It also provided interesting information about each country and the city.

- [WEATHER BITS API] was used to retrieve the weather information about the cities.

- [PIXABAY API] was used to retrieve the images from the countries.

### How to run
* Step1: Clone the repo
* Step2: Create accounts for GEONAMES API, WEATHER BITS API, and PIXABAY API.
* Step3: Create a .env file at root and include the API KEY or user ID.
    * WEATHERBITS_API_KEY=
    * GEONAMES_USER_ID =
    * PIXABAY_API_KEY =
* Step4: On terminal, cd into the root directory and run `npm run build-prod` to build the app.
* Step5: Then run `npm run start` to start the server. The server will run on a deafult port of 9292 unless there is a port assigned by the environment.

