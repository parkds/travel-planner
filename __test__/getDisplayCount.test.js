import { getDisplayCount } from "../src/client/js/getDisplayCount"

// The describe() function takes two arguments - a string description, and a test suite as a callback function.  
// A test suite may contain one or more related tests    
describe("Testing the getDisplayCount functionality", () => {
    
    test("Testing the getDisplayCount() function, should return 3 as mock data only has upto three entries.", () => {
    let mockData=[{"lng":"166.676","geonameId":6696480,"toponymName":"McMurdo Station","countryId":"6697173","fcl":"P","population":1258,"countryCode":"AQ","name":"McMurdo Station","fclName":"city, village,...","countryName":"Antarctica","fcodeName":"populated place","adminName1":"","lat":"-77.846","fcode":"PPL"},{"lng":"-58.96109","geonameId":9072762,"toponymName":"Villa Las Estrellas","countryId":"6697173","fcl":"P","population":0,"countryCode":"AQ","name":"Villa Las Estrellas","fclName":"city, village,...","countryName":"Antarctica","fcodeName":"populated place","adminName1":"","lat":"-62.20001","fcode":"PPL"},{"lng":"-57.89956","geonameId":6944248,"toponymName":"O Higgins","countryId":"6697173","fcl":"P","population":0,"countryCode":"AQ","name":"O Higgins","fclName":"city, village,...","countryName":"Antarctica","fcodeName":"populated locality","adminName1":"","lat":"-63.3209","fcode":"PPLL"}]
    let desiredDisplayLength=10
           expect(getDisplayCount(mockData,desiredDisplayLength)).toBe(3);
})});