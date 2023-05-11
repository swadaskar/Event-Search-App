import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CallService } from '../backend-call.service';

@Component({
  selector: 'app-search-table',
  templateUrl: './search-table.component.html',
  styleUrls: ['./search-table.component.css']
})
export class SearchTableComponent implements OnChanges {

  @Input() searchData: any;
  searchResult: any[] = [];

  @Input() showTable: any;
  showMainTable: boolean = false;

  showDetails: boolean = false;
  selectedEvent: any;
  mapOptions!: google.maps.MapOptions;
  marker: any;
  // venueResults: any;
  
  constructor(private api: CallService,) { }

  ngOnChanges(changes: SimpleChanges) {
    this.showDetails = false;
    if(this.showTable && !this.showDetails){

      // Declare inputs to eventDetails to undefined if new search is made
      this.selectedEvent = undefined;
      

      if (this.searchData != undefined){
        if (this.searchData._embedded != undefined){
          this.searchResult = this.searchData._embedded.events.slice(0,20);

          // Sort the search results by date and time
          this.searchResult.sort(function compare(a, b) {
            let adate = "";
            let bdate = "";
            let atime = "";
            let btime = "";

            if (a.dates?.start?.localDate == undefined)
            { 
              adate = "9999-12-31";
            }else{
              adate = a.dates.start.localDate;
            }

            if (b.dates?.start?.localDate == undefined)
            {
              bdate = "9999-12-31";
            }else{
              bdate = b.dates.start.localDate;
            }

            if (a.dates?.start?.localTime == undefined)
            {
              atime = "23:59:59";
            }else{
              atime = a.dates.start.localTime;
            }

            if (b.dates?.start?.localTime == undefined)
            {
              btime = "23:59:59";
            }else{
              btime = b.dates.start.localTime;
            }

            if (adate < bdate) {
              return -1; // a,b order
            }
            if (adate > bdate) {
              return 1; // b,a order
            }else{
              if (atime < btime) {
                return -1; // a,b order
              }
              if (atime > btime) {
                return 1; // b,a order
              }
            }
            return 0; // a,b maintain order
          });


          this.showMainTable = true;
        }else{
          this.searchResult = [];
          this.showMainTable = true;
        }
      }
      // else{
      //   this.searchResult = [];
      //   this.showMainTable = false;
      // }
    }
  }

  eventDetails(EID: string){
    // Event Details
    this.api.getEventDetailData(EID).subscribe((data: any) => {
      // console.log(this.selectedEvent)
      this.selectedEvent = data;
      console.log(this.selectedEvent)
      this.showMainTable = false;
      this.showDetails = true;

      // // Venue Details
      // this.api.getVenueDetailData(this.selectedEvent['_embedded']['venues'][0]['name']).subscribe((data: any) => {
      //   this.venueResults = data;
      //   console.log(data)
      // });
    });
  }

  getGoogleMaps(location: any){
    console.log("Inside parent component",location)
    // Google Maps Integration
    this.mapOptions = {
      center: {
        lat: location['latitude'],
        lng: location['longitude']
      },
      zoom: 14
    }
    this.marker = {
      position: {
        lat: location['latitude'],
        lng: location['longitude']
      },
    }
  }

  showTableAgain(event: any){
    console.log("Inside search Table: goback")
    this.showMainTable = true;
    this.showDetails = false;
  }
}

