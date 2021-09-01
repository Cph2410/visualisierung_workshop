import { Component, OnInit } from '@angular/core';
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
    }
    else {
      this.toggleView(true)
    }
  }

  private toggleView(state: Boolean) {
    this.dataService.displayCityGraphs = state;
  }
}
