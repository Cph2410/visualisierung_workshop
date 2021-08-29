import { Component, OnInit } from '@angular/core';
import { DSVRowArray } from 'd3';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-panel-overview',
  templateUrl: './panel-overview.component.html',
  styleUrls: ['./panel-overview.component.scss']
})
export class PanelOverviewComponent implements OnInit {
  
  constructor(public dataService: DataService) { 

  }

  ngOnInit(): void {

  }

}
