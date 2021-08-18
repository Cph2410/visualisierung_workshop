import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as d3 from 'd3';
import { DSVRowArray } from 'd3';
import { City } from '../models/city';

@Injectable({
  providedIn: 'root'
})
export class DataClientService {

  @Output() selectCityEvent = new EventEmitter<string>();

  Cities = new Map<string, DSVRowArray>();


  constructor(private _httpClient: HttpClient) { 
    this.loadData(); 
    
  }


  private loadData(): void {
    this._httpClient.get('assets/Data/Output/Berlin.csv',{responseType: 'text'}).subscribe(data => {
      this.Cities.set("Berlin",d3.csvParse(data));
    });
    this._httpClient.get('assets/Data/Output/Koeln.csv',{responseType: 'text'}).subscribe(data => {
      this.Cities.set("Koeln",d3.csvParse(data));
    });
    this._httpClient.get('assets/Data/Output/Dortmund.csv',{responseType: 'text'}).subscribe(data => {
      this.Cities.set("Dortmund",d3.csvParse(data));
    });
    this._httpClient.get('assets/Data/Output/Duesseldorf.csv',{responseType: 'text'}).subscribe(data => {
      this.Cities.set("Duesseldorf",d3.csvParse(data));
    });
    this._httpClient.get('assets/Data/Output/Frankfurt.csv',{responseType: 'text'}).subscribe(data => {
      this.Cities.set("Frankfurt",d3.csvParse(data));
    });
    this._httpClient.get('assets/Data/Output/Hamburg.csv',{responseType: 'text'}).subscribe(data => {
      this.Cities.set("Hamburg",d3.csvParse(data));
    });
    this._httpClient.get('assets/Data/Output/Muenchen.csv',{responseType: 'text'}).subscribe(data => {
      this.Cities.set("Muenchen",d3.csvParse(data));
    });
  }

  
}
