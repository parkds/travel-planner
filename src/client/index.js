import { countryFinder } from './js/countryFinder'
import { selectDate } from './js/selectDate'
import { countryInfo } from './js/countryInfo'
import { findCountryInfo } from './js/countryInfo'
import { addRecommendedCities } from './js/countryInfo'
import { displayCityInfo } from './js/countryInfo'
import { addCountryPictures } from './js/countryInfo'
import { loadCountries } from './js/countryFinder'
import { getDisplayCount} from './js/getDisplayCount'


import './styles/style.scss'
import './styles/countryImageStyle.scss'

console.log("index.js")

export {
    countryFinder,
    selectDate,
    countryInfo,
    findCountryInfo,
    addRecommendedCities,
    displayCityInfo,
    addCountryPictures,
    loadCountries,
    getDisplayCount
}
