import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as d3 from 'd3';
import { DSVRowArray } from 'd3';

@Injectable({
  providedIn: 'root'
})
export class DataClientService {

  @Output() selectCityEvent = new EventEmitter<string>();

  koeln: DSVRowArray;
  dortmund: DSVRowArray;
  duesseldorf: DSVRowArray;
  frankfurt: DSVRowArray;
  hamburg: DSVRowArray;
  berlin: DSVRowArray;
  muenchen: DSVRowArray;


  constructor(private _httpClient: HttpClient) { 
    this.loadData(); 
  }


  private loadData(): void {
    this._httpClient.get('assets/Data/Output/Koeln.csv',{responseType: 'text'}).subscribe(data => {
      this.koeln = d3.csvParse(data);
    });
    this._httpClient.get('assets/Data/Output/Dortmund.csv',{responseType: 'text'}).subscribe(data => {
      this.dortmund = d3.csvParse(data);
    });
    this._httpClient.get('assets/Data/Output/Duesseldorf.csv',{responseType: 'text'}).subscribe(data => {
      this.duesseldorf = d3.csvParse(data);
    });
    this._httpClient.get('assets/Data/Output/Frankfurt.csv',{responseType: 'text'}).subscribe(data => {
      this.frankfurt = d3.csvParse(data);
    });
    this._httpClient.get('assets/Data/Output/Hamburg.csv',{responseType: 'text'}).subscribe(data => {
      this.hamburg = d3.csvParse(data);
    });
    this._httpClient.get('assets/Data/Output/Muenchen.csv',{responseType: 'text'}).subscribe(data => {
      this.muenchen = d3.csvParse(data);
    });
  }
}
