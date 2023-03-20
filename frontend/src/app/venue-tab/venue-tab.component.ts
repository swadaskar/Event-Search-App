import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-venue-tab',
  templateUrl: './venue-tab.component.html',
  styleUrls: ['./venue-tab.component.css']
})
export class VenueTabComponent implements OnInit, OnChanges {

  @Input() venueDetails: any;
  
  constructor() { }
  
  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.venueDetails)
  }

  ngOnInit(): void {
  }

}
