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

import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { NavComponent } from './nav/nav.component';
import { SearchTableComponent } from './search-table/search-table.component';
import { EventDetailsComponent } from './event-details/event-details.component';
import { ArtistTabComponent } from './artist-tab/artist-tab.component';
import { DecimalPipe } from '@angular/common';
import { VenueTabComponent } from './venue-tab/venue-tab.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    NavComponent,
    SearchTableComponent,
    EventDetailsComponent,
    ArtistTabComponent,
    VenueTabComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatAutocompleteModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatProgressSpinnerModule
  ],
  providers: [HttpClient, DecimalPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
