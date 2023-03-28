import { HttpClientModule, HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Material Modules
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { NavComponent } from './nav/nav.component';
import { SearchTableComponent } from './search-table/search-table.component';
import { EventDetailsComponent } from './event-details/event-details.component';
import { ArtistTabComponent } from './artist-tab/artist-tab.component';
import { DecimalPipe } from '@angular/common';
import { VenueTabComponent } from './venue-tab/venue-tab.component';

// Google API
import { GoogleMapsModule } from '@angular/google-maps';
import { FavoritesComponent } from './favorites/favorites.component'

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    NavComponent,
    SearchTableComponent,
    EventDetailsComponent,
    ArtistTabComponent,
    VenueTabComponent,
    FavoritesComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    GoogleMapsModule
  ],
  providers: [HttpClient, DecimalPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
