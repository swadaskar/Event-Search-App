import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-artist-tab',
  templateUrl: './artist-tab.component.html',
  styleUrls: ['./artist-tab.component.css']
})
export class ArtistTabComponent implements OnInit, OnChanges {

  @Input() artistDetails: any[] | undefined;

  
  constructor(private decimalPipe: DecimalPipe) { }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.artistDetails)
    for (var i = 0; this.artistDetails != undefined && i < this.artistDetails?.length; i++) {
      console.log(i)
      console.log(this.artistDetails[i].artists.items[0].name)
    }
  }

  ngOnInit(): void {
  }

  formatFollowersCount(count: number): any {
    return this.decimalPipe.transform(count, '1.0-0');
  }

}
