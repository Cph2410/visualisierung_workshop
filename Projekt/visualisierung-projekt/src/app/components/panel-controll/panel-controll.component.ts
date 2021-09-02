import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from 'src/app/services/data.service';
import { CompareModalComponent } from '../compare-modal/compare-modal.component';
import * as d3 from 'd3';

@Component({
  selector: 'app-panel-control',
  templateUrl: './panel-controll.component.html',
  styleUrls: ['./panel-controll.component.scss']
})
export class PanelControllComponent implements OnInit {

  constructor(private _modalService: NgbModal, public dataService: DataService) { }

  showMietpreis: Boolean = true;
  showLeerstand: Boolean = true;
  showImmopreis: Boolean = true;

  ngOnInit(): void {

  }

  openCompareModal() {
    const modalRef = this._modalService.open(CompareModalComponent,  { windowClass : "compare-modal"})
    modalRef.componentInstance.citiesToCompare = this.dataService.displayedCities;
  }

  toggleView() {
    this.dataService.displayCityGraphs = !this.dataService.displayCityGraphs;
  }

  toggleImmobielienpreise() {
    if (this.showImmopreis) {
      d3.selectAll(".line-immopreis").each(function() {
        d3.select(this).style('visibility', 'hidden')
      });
      d3.selectAll(".text-immopreis").each(function() {
        d3.select(this).style('visibility', 'hidden')
      });
    }
    else {
      d3.selectAll(".line-immopreis").each(function() {
        d3.select(this).style('visibility', 'visible')
      });
      d3.selectAll(".text-immopreis").each(function() {
        d3.select(this).style('visibility', 'visible')
      });
    }
    this.showImmopreis = !this.showImmopreis;
  }

  toggleLeerstand() {
    if (this.showLeerstand) {
      d3.selectAll(".line-leerstand").each(function() {
        d3.select(this).style('visibility', 'hidden')
      });
      d3.selectAll(".text-leerstand").each(function() {
        d3.select(this).style('visibility', 'hidden')
      });
    }
    else {
      d3.selectAll(".line-leerstand").each(function() {
        d3.select(this).style('visibility', 'visible')
      });
      d3.selectAll(".text-leerstand").each(function() {
        d3.select(this).style('visibility', 'visible')
      });
    }
    this.showLeerstand = !this.showLeerstand;
  }

  toggleMietpreise() {
    if (this.showMietpreis) {
      d3.selectAll(".line-mietpreis").each(function() {
        d3.select(this).style('visibility', 'hidden')
      });
      d3.selectAll(".text-mietpreis").each(function() {
        d3.select(this).style('visibility', 'hidden')
      });
    }
    else {
      d3.selectAll(".line-mietpreis").each(function() {
        d3.select(this).style('visibility', 'visible')
      });
      d3.selectAll(".text-mietpreis").each(function() {
        d3.select(this).style('visibility', 'visible')
      });
    }
    this.showMietpreis = !this.showMietpreis;
  }
}
