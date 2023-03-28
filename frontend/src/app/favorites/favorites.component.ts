import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit, OnChanges {

  favorites: any;

  mouseOver: boolean[] = [];

  constructor() { 
  }

  ngOnChanges(changes: SimpleChanges): void {
    // let temp:any = localStorage.getItem('favorites');
    // if (temp != null) {
    //   this.favorites = JSON.parse(temp);
    // }
    // console.log(this.favorites)
  }


  ngOnInit(): void {
    let temp:any = localStorage.getItem('favorites');
    if (temp != null) {
      this.favorites = JSON.parse(temp);
      for(let i = 0; i < this.favorites.length; i++) {
        this.mouseOver.push(false);
      }
    }
    console.log(this.favorites)
  }

  deleteFavorite(event: any) {
    alert("Removed from favorites!");
    this.favorites = this.favorites.filter((item: any) => item.event != event);
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
  }

}
