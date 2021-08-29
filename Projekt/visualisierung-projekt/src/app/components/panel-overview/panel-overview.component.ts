import { Component, OnInit } from '@angular/core';
import { DSVRowArray } from 'd3';
import { DataClientService} from 'src/app/services/data-client.service';

@Component({
  selector: 'app-panel-overview',
  templateUrl: './panel-overview.component.html',
  styleUrls: ['./panel-overview.component.scss']
})
export class PanelOverviewComponent implements OnInit {
  
  displayedCities = new Map<string, DSVRowArray>();
  maxPreis: number;
  maxLeerstand: number;
  minPreis: number;
  minLeerstand: number;

  constructor(private _dataService: DataClientService) { 
    this.maxPreis = this._dataService.maxPreis;
    this.maxLeerstand = this._dataService.maxLeerstand;
    this.minPreis = this._dataService.minPreis;
    this.minLeerstand = this._dataService.minLeerstand;
  }

  ngOnInit(): void {
    this._dataService.selectCityEvent.subscribe((city: string) => {
      this.toggleDisplayCity(city)
    })
  }

  private toggleDisplayCity(name: string){
    try {
      if((this.displayedCities.has(name))){
        this.displayedCities.delete(name)
      }
      else {
        this.displayedCities.set(name,this._dataService.Cities.get(name)!);
      }
    }
    catch(err){
      console.log(err)
    }
  }

}
