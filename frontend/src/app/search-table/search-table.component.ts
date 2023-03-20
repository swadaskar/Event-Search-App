import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CallService } from '../backend-call.service';

@Component({
  selector: 'app-search-table',
  templateUrl: './search-table.component.html',
  styleUrls: ['./search-table.component.css']
})
export class SearchTableComponent implements OnChanges {

  @Input() searchResult: any;
  @Input() showTable: any;

  selectedEvent: any;
  // venueResults: any;
  
  constructor(private api: CallService,) { }

  ngOnChanges(changes: SimpleChanges) {
    if(this.showTable){
      if (this.searchResult._embedded != undefined){
        this.searchResult = this.searchResult._embedded.events;
      }else{
        this.searchResult = [];
      }
    }
  }

  eventDetails(EID: string){
    // Event Details
    this.api.getEventDetailData(EID).subscribe((data: any) => {
      // console.log(this.selectedEvent)
      this.selectedEvent = data;
      console.log(this.selectedEvent)
      this.showTable = false;

      // // Venue Details
      // this.api.getVenueDetailData(this.selectedEvent['_embedded']['venues'][0]['name']).subscribe((data: any) => {
      //   this.venueResults = data;
      //   console.log(data)
      // });
    });
  }
}
