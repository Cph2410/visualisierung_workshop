import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DSVRowArray } from 'd3';
import { DataClientService } from 'src/app/services/data-client.service';
import { CompareModalComponent } from '../compare-modal/compare-modal.component';

@Component({
  selector: 'app-panel-control',
  templateUrl: './panel-controll.component.html',
  styleUrls: ['./panel-controll.component.scss']
})
export class PanelControllComponent implements OnInit {

  displayedCities= new Map<string, DSVRowArray>();

  constructor(private _modalService: NgbModal, private _dataService: DataClientService) { }

  ngOnInit(): void {
    this._dataService.selectCityEvent.subscribe((city: string) => {
      this.toggleDisplayCity(city)
    })
  }

  openCompareModal() {
    const modalRef = this._modalService.open(CompareModalComponent)
    modalRef.componentInstance.citiesToCompare = this.displayedCities;
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
