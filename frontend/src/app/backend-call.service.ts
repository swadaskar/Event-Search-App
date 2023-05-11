import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ipinfo, geocoding, autosuggest, eventsearch, eventdetails, venuedetails, artistdetails } from './model';


// Current local backend server
// const baseBackendURL = 'https://api-dot-event-search-382200.uc.r.appspot.com/'
const baseBackendURL = 'http://localhost:5000'

// geooding api
const baseGeocodingURL = 'https://maps.googleapis.com/maps/api/geocode/json?address='
const geocodingAPIKey = 'AIzaSyADHRIj3MAMta84N8y0ZqEnNuiAQpZKJSQ'
// https://maps.googleapis.com/maps/api/geocode/json?address=University+of+Southern+California+CA&key=AIzaSyADHRIj3MAMta84N8y0ZqEnNuiAQpZKJSQ

// ipinfo api
const baseIPInfoURL = 'https://ipinfo.io/'
const IPInfoTokenKey = 'f9416a8146ee1d'
// https://ipinfo.io/68.181.16.82?token=f9416a8146ee1d

@Injectable({
    providedIn: 'root'
})
export class CallService {
    constructor(private http: HttpClient) { }

    // ipinfo API
    getIpInfo(){
        return this.http.get<ipinfo>(baseIPInfoURL + '?token=' + IPInfoTokenKey);
    }

    // GeoCoding API
    getGeoCoding(location: string){
        return this.http.get<geocoding>(baseGeocodingURL + location + '&key=' + geocodingAPIKey);
    }

    // Ticketmaster API
    getAutoSuggest(keyword: string){
        return this.http.get<autosuggest>(baseBackendURL + `/autoSuggest?keyword=${keyword}`);
    }

    getEventSearchData(keyword: string, segmentId: string, radius: number, unit: string, latlon: any){
        return this.http.get<eventsearch>(baseBackendURL + `/eventsSearch?keyword=${keyword}&segmentId=${segmentId}&radius=${radius}&unit=${unit}&latlon=${latlon}`);
    }

    getEventDetailData(EID: string){
        return this.http.get<eventdetails>(baseBackendURL + `/eventDetails?eventID=${EID}`);
    }

    getVenueDetailData(keyword: string){
        return this.http.get<venuedetails>(baseBackendURL + `/venueDetails?keyword=${keyword}`);
    }

    getArtistDetailData(artist: string) {
        return this.http.get<artistdetails>(baseBackendURL + `/artistDetails?artist=${artist}`);
    }
}

