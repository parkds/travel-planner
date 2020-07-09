//Resource: https://www.rithmschool.com/courses/intermediate-node-express/api-tests-with-jest

const regeneratorRuntime = require("regenerator-runtime");

// we will use supertest to test HTTP requests/responses
const request = require("supertest");
// we also need our app for the correct routes!
const server = require('../src/server/server')

//Checks to make sure that all API endpoints work on the server side

//End points 
// /getCountryNames
// /getCountryInfo/:countryCode
// /getCountryCityData/:countryCode
// /getCityWeatherInfo/:lat&:lng
// /getCountryPictures/:countryName

describe("GET / ", () => {
    test("It should respond with an array of students", async () => {
      const response = await request(server).get("/getCountryNames");
      //expect(response.body).toEqual(["Elie", "Matt", "Joel", "Michael"]);
      expect(response.statusCode).toBe(200);
    });
  });