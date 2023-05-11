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
  resetSection: boolean = false;

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
          // return res !== null && res.length >= this.minLengthTerm
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
        // console.log(data)
        if (data._embedded == undefined || data._embedded.attractions == undefined || data._embedded.attractions.length == 0) {
          this.errorMsg = "No results found";
          this.filteredKeywords = [];
        } else {
          let attractionsNames = data._embedded.attractions.map((attraction: any) => attraction.name);
          this.errorMsg = "";
          this.filteredKeywords = attractionsNames;
        }
        // console.log(this.errorMsg)
        console.log(this.filteredKeywords, this.keywordCtrl.value);
      });
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
      this.reactiveForm.controls['location'].reset();
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
          // alert('Enter Correct Location');
          this.latlon = '';
          this.makeTable();
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
    if (this.latlon=='') {
      this.resetSection = false;
      this.searchResult = [];
    }else{
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
  }

  resetForm(){
    this.reactiveForm.reset();
    this.isAutoDetect = false;
    this.reactiveForm.controls['location'].enable();
    // this.reactiveForm.value.distance = 10;
    this.reactiveForm.controls['distance'].setValue(10);
    this.reactiveForm.controls['category'].setValue('default');
    this.filteredKeywords = [];
    this.resetSection = true;
    this.latlon = '';
  }
}
