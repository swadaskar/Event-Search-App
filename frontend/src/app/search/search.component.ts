import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { debounceTime, tap, switchMap, finalize, distinctUntilChanged, filter } from 'rxjs/operators';
import { CallService } from '../backend-call.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit{
  title = 'Event Search Form';
  reactiveForm!: FormGroup;
  searchResult: any;
  latlon!: string;
  isAutoDetect: boolean = false;
  isLoading: boolean = false;
  filteredKeywords: any;
  keywordCtrl = new FormControl();
  minLengthTerm = 1;
  errorMsg!: string;
  resetSection: boolean = true;

  constructor(private api: CallService,) { }
  
  ngOnInit(){
    this.reactiveForm = new FormGroup({
      keyword: new FormControl(null, Validators.required),
      distance: new FormControl(10),
      category: new FormControl('default', Validators.required),
      location: new FormControl(null, Validators.required),
      autodetect: new FormControl(null)
    });


    this.keywordCtrl.valueChanges
      .pipe(
        filter(res => {
          if (this.keywordCtrl.value=="" || res === null || res.length < this.minLengthTerm) {
            this.filteredKeywords = []
            return false
          }
          return true
        }),
        distinctUntilChanged(),
        debounceTime(800),
        tap(() => {
          this.errorMsg = "";
          this.filteredKeywords = [];
          this.isLoading = true;
        }),
        switchMap(value => this.api.getAutoSuggest(value)
          .pipe(
            finalize(() => {
              this.isLoading = false;
            }),
          )
        )
      )
      .subscribe((data: any) => {
        console.log(data)
        if (data._embedded == undefined || data._embedded.attractions == undefined || data._embedded.attractions.length == 0) {
          this.errorMsg = "No results found";
          this.filteredKeywords = [];
        } else {
          let attractionsNames = data._embedded.attractions.map((attraction: any) => attraction.name);
          this.errorMsg = "";
          this.filteredKeywords = attractionsNames;
        }
        console.log(this.errorMsg)
        console.log(this.filteredKeywords, this.keywordCtrl.value);
      });

    // this.api.getIpInfo().subscribe((data) => {
    //   console.log(data);
    // });
    // this.myserv.getGeoCoding('University of Southern California CA');
    // this.myserv.getAutoSuggest('L');
    // this.myserv.getEventSearchData('Los Angeles', 'KZFzniwnSyZfZ7v7nE', 10, 'miles', '34.036,-118.279');
    // this.myserv.getEventDetailData('G5eYZ98HCe8Sl');
    // this.myserv.getVenueDetailData('USC Galen Center');
  }

  autoLocate(eventData: any): void{
    if (eventData.target.checked) {
      this.reactiveForm.get('location')?.disable();
      this.api.getIpInfo().subscribe((data) => {
        console.log(data);
        this.latlon = data.loc;
      });
      this.isAutoDetect = true;
      this.reactiveForm.value.location = '';
    }
    else {
      this.reactiveForm.get('location')?.enable();
      this.isAutoDetect = false;
      this.reactiveForm.value.location = '';
      this.latlon = '';
    }
  }

  onSubmit(): void{
    if (!this.isAutoDetect) {
      this.api.getGeoCoding(this.reactiveForm.value.location).subscribe(res => {
        if (res['status'] != 'OK') {
          alert('Enter Correct Location');
          this.latlon = '';
        }
        else {
          this.latlon = res.results[0].geometry.location.lat+','+res.results[0].geometry.location.lng;
          this.makeTable();
        }
      });
    }else{
      this.makeTable();
    }
  }

  makeTable(): void{
    let keyword = this.keywordCtrl.value;
    let distance = this.reactiveForm.value.distance;
    let category = this.reactiveForm.value.category;
    console.log(keyword, distance, category, this.latlon, this.reactiveForm.value.autodetect);
    this.api.getEventSearchData(keyword, category, distance, 'miles', this.latlon).subscribe((res) => {
      console.log(res);
      this.searchResult = res;
      this.resetSection = false;
    });
  }

  resetForm(): void{
    // this.reactiveForm.reset();
    this.isAutoDetect = false;
    this.reactiveForm.controls['location'].enable();
    this.reactiveForm.value.distance = 10;
    this.filteredKeywords = [];
    this.resetSection = true;
  }
}
