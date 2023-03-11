const express = require('express');
const cors = require('cors');
require("dotenv").config({ path: __dirname + "/../.env" });
const APIfunctions = require('./API_functions');
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

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Node Server listening on port ${PORT}`);
});