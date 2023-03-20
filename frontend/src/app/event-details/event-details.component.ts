import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CallService } from '../backend-call.service';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit, OnChanges {

  @Input() showEventDetails: any;
  @Input() eventResults: any;
  // @Input() venueResults: any;


  ticketStatus: any;
  artistResults: any[];
  venueResults: any;

  constructor(private api : CallService) {
    this.artistResults = [];
    this.venueResults = {};
   }

  async ngOnChanges(changes: SimpleChanges): Promise<void> {
    // console.log(this.eventResults)
    // console.log(this.showEventDetails)
    if (this.showEventDetails){
      if (this.eventResults._embedded != undefined) {
        this.eventResults = this.eventResults;
        this.ticketStatus = this.getStatus(this.eventResults['dates']['status']['code'])
      } else {
        this.eventResults = [];
      }
    }

    // Artist Details
    for (var i = 0; i < this.eventResults['_embedded']['attractions'].length; i++){
      if (this.eventResults['_embedded']['attractions'][i]['classifications'][0]['segment']['name'] == "Music") {
        // console.log(this.eventResults['_embedded']['attractions'][i]['name']);
        // console.log(i)
        this.api.getArtistDetailData(this.eventResults['_embedded']['attractions'][i]['name']).subscribe((data: any) => {
          this.artistResults.push(data);
          // console.log(data)
        });
      }
    }

    // Venue Details
    this.api.getVenueDetailData(this.eventResults['_embedded']['venues'][0]['name']).subscribe((data: any) => {
      this.venueResults=data;
      console.log(data)
    });

    // const temp = this.eventResults['_embedded']['attractions'].map((t:any) => t['classifications'][0]['segment']['name'] == "Music" ? this.api.getArtistDetailData(t['name']) : null).filter((v: any) => v!=undefined);
    // this.artistResults = await Promise.all(temp);
    // console.log(this.artistResults)


    // for (var i = 0; this.artistResults!=undefined && i < this.artistResults?.length; i++) {
    //   console.log(this.artistResults[i].artists.items[0].name)
    // }
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
  }

  goBack(){
    // go back to search results
    console.log("goback")
  }

}
