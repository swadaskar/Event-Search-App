var SpotifyWebApi = require('spotify-web-api-node');

var credentials = {
    clientId: 'b3ab00bc02984f21a293d1bcccb9b3df',
    clientSecret: 'c5badc16136e4f7a99165a003246cd59'
    // accessToken: 'BQCW5yWorUFg5O4VZgWXNoAkigNJnwLnDjzlTKe0dgvuDT9_wYnX7po30q4f3XxrQvqdf4xiHUBhtHJFpRN_BxixsankiSUAL0qw0doiCfrgQEwc4NaW'
};

var spotifyApi = new SpotifyWebApi(credentials);

async function getArtistsDetails(artistName) {
    try {
        const data = await spotifyApi.clientCredentialsGrant();
        console.log('The access token expires in ' + data.body['expires_in']);
        console.log('The access token is ' + data.body['access_token']);
        spotifyApi.setAccessToken(data.body['access_token']);
        let response = await spotifyApi.searchArtists(artistName);
        console.log('Search artists by "' + artistName + '"', response.body);
        return response.body.json();
    } catch (err) {
        console.log('Something went wrong when retrieving an access token', err);
        return {"error" : "Something went wrong when retrieving an access token"};
    }
}

module.exports.getArtistsDetails = getArtistsDetails
