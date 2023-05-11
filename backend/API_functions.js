const axios = require('axios')
// require("dotenv").config({ path: __dirname + "/../.env" });
const geohash = require('ngeohash');
const apiKey = 'Jdf4GP2674AxHAGBMLInCvwN6ZydDgZ5'

// sample autosuggest url
// https://app.ticketmaster.com/discovery/v2/suggest?apikey=Jdf4GP2674AxHAGBMLInCvwN6ZydDgZ5&keyword=L

async function getAutoSuggest(keyword) {
    let options = {
        method: 'GET',
        url: `https://app.ticketmaster.com/discovery/v2/suggest`,
        params: { apikey: apiKey, keyword: keyword },
        headers: { 'Content-Type': 'application/json'}
    }
    let response = await axios(options).catch(function (error) {
        console.log(`Error received:${error}`)
    })
    return response.data
}

// event search sample url
// https://app.ticketmaster.com/discovery/v2/events.json?apikey=Jdf4GP2674AxHAGBMLInCvwN6ZydDgZ5&keyword=Los+Angeles&segmentId=KZFzniwnSyZfZ7v7nE&radius=10&unit=miles&geoPoint=9q5cs

async function getEventSearchData(keyword, segmentId, radius, unit, latlon) {
    let [lat,lon] = latlon.split(',')
    let categories = {
        "default": "",
        "music": "KZFzniwnSyZfZ7v7nJ",
        "sports": "KZFzniwnSyZfZ7v7nE",
        "art": "KZFzniwnSyZfZ7v7na",
        "film": "KZFzniwnSyZfZ7v7nn",
        "miscellaneous": "KZFzniwnSyZfZ7v7n1"
    };
    console.log(`\nEvent Search Data Call: ${keyword}, ${categories[segmentId]}, ${radius}, ${unit}, ${latlon}`);
    let options = {
        method: 'GET',
        url: `https://app.ticketmaster.com/discovery/v2/events.json`,
        params: { apikey: apiKey, keyword: keyword, segmentId: categories[segmentId], radius: radius, unit: unit, geoPoint: geohash.encode(lat, lon, 7) },
        headers: { 'Content-Type': 'application/json'}
    }
    let response = await axios(options).catch(function (error) {
        console.log(`Error received:${error}`)
    })
    return response.data
}

// event detail sample url
// https://app.ticketmaster.com/discovery/v2/events/G5eYZ98HCe8Sl.json?apikey=Jdf4GP2674AxHAGBMLInCvwN6ZydDgZ5

async function getEventDetailData(eventID) {
    let options = {
        method: 'GET',
        url: `https://app.ticketmaster.com/discovery/v2/events/${eventID}.json`,
        params: { apikey: apiKey },
        headers: {'Content-Type': 'application/json'}
    }
    let response = await axios(options).catch(function (error) {
        console.log(`Error received:${error}`)
    })
    return response.data
}

// venue detail sample url
// https://app.ticketmaster.com/discovery/v2/venues.json?keyword=USC%20Galen%20Center&apikey=Jdf4GP2674AxHAGBMLInCvwN6ZydDgZ5

async function getVenueDetailData(keyword) {
    let options = {
        method: 'GET',
        url: `https://app.ticketmaster.com/discovery/v2/venues.json`,
        params: { apikey: apiKey, keyword: keyword },
        headers: { 'Content-Type': 'application/json'}
    }
    let response = await axios(options).catch(function (error) {
        console.log(`Error received:${error}`)
    })
    // console.log("Venue Response:",response)
    // if (response.data) {
    //     return response.data
    // } else {
    //     return {}
    // }

    return response.data
}

module.exports.getAutoSuggest = getAutoSuggest
module.exports.getEventSearchData = getEventSearchData
module.exports.getEventDetailData = getEventDetailData
module.exports.getVenueDetailData = getVenueDetailData