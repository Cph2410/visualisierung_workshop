import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from 'src/app/services/data.service';
import { CompareModalComponent } from '../compare-modal/compare-modal.component';

@Component({
  selector: 'app-panel-control',
  templateUrl: './panel-controll.component.html',
  styleUrls: ['./panel-controll.component.scss']
})
export class PanelControllComponent implements OnInit {

  

  constructor(private _modalService: NgbModal, private _dataService: DataService) { }

  ngOnInit(): void {

  }

  openCompareModal() {
    const modalRef = this._modalService.open(CompareModalComponent,  { windowClass : "compare-modal"})
    modalRef.componentInstance.citiesToCompare = this._dataService.displayedCities;
  }
}
