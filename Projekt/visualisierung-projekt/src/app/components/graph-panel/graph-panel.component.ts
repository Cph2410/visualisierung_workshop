import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as d3 from 'd3';
import { svg } from 'd3';

@Component({
  selector: 'app-graph-panel',
  templateUrl: './graph-panel.component.html',
  styleUrls: ['./graph-panel.component.scss']
})
export class GraphPanelComponent implements OnInit {

  dataurl: string = './Data/Output/Koeln.csv';
  data: any[] = [];
  constructor(private _http: HttpClient) { }

  
  // TODO: Put into seperate Service
  ngOnInit(): void {
    this._http.get('assets/Data/Output/Koeln.csv',{responseType: 'text'}).subscribe(data => {
      var koeln = d3.csvParse(data);
      console.log(koeln)
    })
  }

  createGraphSvg() {
      d3.csv('./Data/Output/Koeln.csv').then(function(data){

      })
  }
  
  private getData(){
    return this._http.get(this.dataurl, {responseType: 'text'});
  }

  // private loadData(){
  //   this.getData().subscribe(data => {
  //     const list = data.
  //   })
  // }
}
