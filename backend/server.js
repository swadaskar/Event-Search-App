const express = require('express');
const cors = require('cors');
require("dotenv").config({ path: __dirname + "/../.env" });
const APIfunctions = require('./API_functions');
const SpotifyAPI = require('./Spotify');
const app = express();

app.use(cors());

app.get("/", async function (req, res) {
  res.json("Hello World!");
});


app.get("/autoSuggest", async function (req, res) {
  console.log(`\nAuto Suggest Call: ${req.query.keyword}`);
  let response = await APIfunctions.getAutoSuggest(req.query.keyword);
  return res.json(response);
});

app.get("/eventsSearch", async function (req, res) {
  console.log(`\nEvent Search Data Call: ${req.query}`);
  let response = await APIfunctions.getEventSearchData(req.query.keyword, req.query.segmentId, req.query.radius, req.query.unit, req.query.latlon);
  return res.json(response);
});

app.get("/eventDetails", async function (req, res) {
  console.log(`\nEvent Details Call: ${req.query.eventID}`);
  let response = await APIfunctions.getEventDetailData(req.query.eventID);
  return res.json(response);
});

app.get("/venueDetails", async function (req, res) {
  console.log(`\nVenue Details Call: ${req.query.keyword}`);
  let response = await APIfunctions.getVenueDetailData(req.query.keyword);
  return res.json(response);
})

app.get("/artistDetails", async function (req, res) {
  console.log(`\nArtist Details Call: ${req.query.artist}`);

  var SpotifyWebApi = require('spotify-web-api-node');

  var credentials = {
    clientId: 'b3ab00bc02984f21a293d1bcccb9b3df',
    clientSecret: 'c5badc16136e4f7a99165a003246cd59'
    // accessToken: 'BQCW5yWorUFg5O4VZgWXNoAkigNJnwLnDjzlTKe0dgvuDT9_wYnX7po30q4f3XxrQvqdf4xiHUBhtHJFpRN_BxixsankiSUAL0qw0doiCfrgQEwc4NaW'
  };

  var spotifyApi = new SpotifyWebApi(credentials);
  try {
    const data = await spotifyApi.clientCredentialsGrant();
    console.log('The access token expires in ' + data.body['expires_in']);
    console.log('The access token is ' + data.body['access_token']);
    spotifyApi.setAccessToken(data.body['access_token']);

    let response = await spotifyApi.searchArtists(req.query.artist);
    console.log('Search artists by "' + response.body.artists.name + '"');

    let r2 = await spotifyApi.getArtistAlbums(response.body.artists.items[0].id, { limit: 3 });
    // console.log("Response2 albums", r2)

    let finalResponse = response.body
    finalResponse.albums = r2.body

    return res.json(finalResponse);
  } catch (err) {
    console.log('Something went wrong when retrieving an access token', err);
    return { "error": "Something went wrong when retrieving an access token" };
  }
})

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Node Server listening on port ${PORT}`);
});