import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { DataClientService } from 'src/app/services/data-client.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-panel-container',
  templateUrl: './panel-container.component.html',
  styleUrls: ['./panel-container.component.scss']
})
export class PanelContainerComponent implements OnInit {

  

  constructor(public dataService: DataService, private _dataClientService: DataClientService) { }

  ngOnInit(): void {
    this._dataClientService.selectCityEvent.subscribe((city: string) => {
      this.CityAddedHandle()
    })
  }

  private CityAddedHandle() {
    if(this.dataService.displayedCities.size === 0) {
      this.toggleView(false)
      d3.selectAll(".panel-filter-button").style("background-color", "#969696");
      var x = document.getElementsByClassName("panel-filter-button");
        var i;
        for (i = 0; i < x.length; i++) {
          (<HTMLElement>x[i]).removeAttribute("enabled");
          (<HTMLElement>x[i]).setAttribute("disabled", "disabled");
        }
        var x = document.getElementsByClassName("panel-control-button");
        var i;
        for (i = 0; i < x.length; i++) {
          (<HTMLElement>x[i]).removeAttribute("enabled");
          (<HTMLElement>x[i]).setAttribute("disabled", "disabled");
        }
    }
    else {
      this.toggleView(true)
      d3.selectAll(".panel-filter-button").style("background-color", "#f5f5f5");
      var x = document.getElementsByClassName("panel-filter-button");
      var i;
      for (i = 0; i < x.length; i++) {
        (<HTMLElement>x[i]).removeAttribute("disabled");
        (<HTMLElement>x[i]).setAttribute("enabled", "enabled");
      }
      var x = document.getElementsByClassName("panel-control-button");
      var i;
      for (i = 0; i < x.length; i++) {
        (<HTMLElement>x[i]).removeAttribute("disabled");
        (<HTMLElement>x[i]).setAttribute("enabled", "enabled");
      }
    }
  }

  private toggleView(state: Boolean) {
    this.dataService.displayCityGraphs = state;
  }
}
