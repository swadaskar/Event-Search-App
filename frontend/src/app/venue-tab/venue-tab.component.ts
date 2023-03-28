import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-venue-tab',
  templateUrl: './venue-tab.component.html',
  styleUrls: ['./venue-tab.component.css']
})
export class VenueTabComponent implements OnInit, OnChanges {

  @Input() venueDetails: any;
  
  @Output() gmapEvent = new EventEmitter<any>();

  showMoreOH: boolean = true;
  showMoreGR: boolean = true;
  showMoreCR: boolean = true;

  constructor() { }
  
  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.venueDetails)
  }

  ngOnInit(): void {
  }

  sendBackLocation():void {
    // console.log("Hello from Venue Tab")
    let latlon = { latitude: parseFloat(this.venueDetails['_embedded']['venues'][0]['location']['latitude']), longitude: parseFloat(this.venueDetails['_embedded']['venues'][0]['location']['longitude']) }
    // console.log(latlon)
    this.gmapEvent.emit(latlon);
  }

  changeShowMoreOH(): void {
    this.showMoreOH = !this.showMoreOH;
  }

  changeShowMoreGR(): void {
    this.showMoreGR = !this.showMoreGR;
  }

  changeShowMoreCR(): void {
    this.showMoreCR = !this.showMoreCR;
  }
}
