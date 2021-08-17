import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as d3 from 'd3';
import { DSVRowArray, svg } from 'd3';

@Component({
  selector: 'app-graph-panel',
  templateUrl: './graph-panel.component.html',
  styleUrls: ['./graph-panel.component.scss']
})
export class GraphPanelComponent implements OnInit {
  
  @Input() City: DSVRowArray;

  private width = 240;
  private height = 80;
  private margin = 20;


  // TODO: Put into seperate Service
  ngOnInit(): void {
  }
}
