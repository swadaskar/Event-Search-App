import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-artist-tab',
  templateUrl: './artist-tab.component.html',
  styleUrls: ['./artist-tab.component.css']
})
export class ArtistTabComponent implements OnInit, OnChanges {

  @Input() artistDetails: any[];

  
  constructor(private decimalPipe: DecimalPipe) { 
    this.artistDetails = [];
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.artistDetails);
  }

  ngOnInit(): void {
  }

  formatFollowersCount(count: number): any {
    return this.decimalPipe.transform(count, '1.0-0');
  }

}
