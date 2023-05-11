import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CallService } from '../backend-call.service';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit, OnChanges {

  @Input() showEventDetails: any;
  showDetails: boolean = false;

  @Input() eventResults: any;
  // @Input() venueResults: any;

  @Output() gmapEvent = new EventEmitter<any>();
  @Output() backEvent = new EventEmitter<any>();

  genreField: String | undefined;
  ticketStatus: any;
  artistResults: any[];
  venueResults: any;
  isFavourite: boolean = false;
  favorites: any;

  constructor(private api : CallService) {
    this.artistResults = [];
    this.venueResults = {};
   }

  ngOnChanges(changes: SimpleChanges) {
    // console.log(this.eventResults)
    // console.log(this.showEventDetails)
    if (this.showEventDetails){
      this.showDetails = true;
      if (this.eventResults._embedded != undefined) {
        
        this.eventResults = this.eventResults;
        this.ticketStatus = this.getStatus(this.eventResults['dates']['status']['code'])
        
        // Genre Field
        this.genreField = ['segment', 'genre', 'subGenre', 'type', 'subType'].filter(Type => (
          Type in this.eventResults['_embedded']['attractions'][0]['classifications'][0] &&
          this.eventResults['_embedded']['attractions'][0]['classifications'][0][Type]['name'] !== "undefined" &&
            this.eventResults['_embedded']['attractions'][0]['classifications'][0][Type]['name'] !== "Undefined"
        )).map(Type => this.eventResults['_embedded']['attractions'][0]['classifications'][0][Type]['name']).join(" | ");      

      } else {
        this.eventResults = [];
      }
    

      // Artist Details
      for (var i = 0; i < this.eventResults['_embedded']['attractions'].length; i++){
        if (this.eventResults['_embedded']['attractions'][i]['classifications'][0]['segment']['name'] == "Music") {
          this.api.getArtistDetailData(this.eventResults['_embedded']['attractions'][i]['name']).subscribe((data: any) => {
            if (!("error" in data)){
              this.artistResults.push(data);
            }
          });
        }
      }

      // Venue Details
      this.api.getVenueDetailData(this.eventResults['_embedded']['venues'][0]['name']).subscribe((data: any) => {
        this.venueResults=data;
        console.log(data)
      });
    }
  }

  getStatus(statusCode: string){
    switch (statusCode) {
      case "onsale":
        return ["green", "On Sale"]
      case "offsale":
        return ["red", "Off Sale"]
      case "canceled":
      case "cancelled":
        return ["black", "Canceled"]
      case "postponed":
        return ["orange", "Postponed"]
      case "rescheduled":
        return ["orange", "Rescheduled"]
      default:
        return []
    }
  }

  ngOnInit(): void {
    // To check if the event is already in favorites
    let temp: any = localStorage.getItem('favorites');
    if (temp != null) {
      this.favorites = JSON.parse(temp);
    } else {
      this.favorites = [];
    }

    for(var i = 0; i < this.favorites.length; i++){
      if (this.favorites[i]['id'] == this.eventResults['id']){
        this.isFavourite = true;
        break;
      }
    }
  }

  makeFavourite(){
    if (this.isFavourite){
      alert("Event Removed from Favorites!");
      this.favorites = this.favorites.filter((item: any) => item['id'] !== this.eventResults['id']);
      this.isFavourite = false;
    }else{
      alert("Event Added to Favorites!")
      let temp = {
        id: this.eventResults['id'],
        date: this.eventResults['dates']['start']['localDate'],
        event: this.eventResults['name'],
        category: this.genreField,
        venue: this.eventResults['_embedded']['venues'][0]['name'],
      }
      this.favorites.push(temp);
      this.isFavourite = true;
    }
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
  }

  goBack(){
    // go back to search results
    console.log("Inside event details: goback")
    this.artistResults = [];
    this.venueResults = {};
    this.showDetails = false;
    this.backEvent.emit(true);
  }

  sendBackLocation(location: any){
    this.gmapEvent.emit(location);
  }
}
