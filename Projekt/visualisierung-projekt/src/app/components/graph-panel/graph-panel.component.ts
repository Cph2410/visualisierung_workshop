import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { svg } from 'd3';

@Component({
  selector: 'app-graph-panel',
  templateUrl: './graph-panel.component.html',
  styleUrls: ['./graph-panel.component.scss']
})
export class GraphPanelComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  createGraphSvg() {
      d3.csv('./Data/Output/Koeln.csv').then(function(data){

      })
  }
}
