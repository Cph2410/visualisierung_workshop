import { Component, OnInit } from '@angular/core';
import { DataClientService} from 'src/app/services/data-client.service';

@Component({
  selector: 'app-panel-overview',
  templateUrl: './panel-overview.component.html',
  styleUrls: ['./panel-overview.component.scss']
})
export class PanelOverviewComponent implements OnInit {
  
  private _displayedCities: string[];

  constructor(private _dataService: DataClientService) { }

  ngOnInit(): void {
    this._dataService.selectCityEvent.subscribe((city: string) => {
      console.log('Selected City: '+city)
    })
  }

}
