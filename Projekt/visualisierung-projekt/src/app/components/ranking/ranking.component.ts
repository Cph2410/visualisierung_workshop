import { Component, Directive, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { DSVRowArray } from 'd3';
import { LatestCityValues } from 'src/app/models/city';
import { DataClientService } from 'src/app/services/data-client.service';
import { DataService } from 'src/app/services/data.service';

export type SortColumn = keyof LatestCityValues | '';
export type SortDirection = 'asc' | 'desc' | '';
const rotate: {[key: string]: SortDirection} = { 'asc': 'desc', 'desc': '', '': 'asc' };

const compare = (v1: string | number, v2: string | number) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

export interface SortEvent {
  column: SortColumn;
  direction: SortDirection;
}

@Directive({
  selector: 'th[sortable]',
  host: {
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)': 'rotate()'
  }
})
export class NgbdSortableHeader {

  @Input() sortable: SortColumn = '';
  @Input() direction: SortDirection = '';
  @Output() sort = new EventEmitter<SortEvent>();

  rotate() {
    this.direction = rotate[this.direction];
    this.sort.emit({column: this.sortable, direction: this.direction});
  }
}


@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss']
})
export class RankingComponent implements OnInit {

  // A little bit Hacky because of Time
  latestCityValues = [
    {Name: "Berlin", Mietpreis: 10.17, Immobilienpreis: 4781.0, Leerstand: 0.8, Id: "Berlin" }, // 2021, 2021, 2018
    {Name: "Dortmund", Mietpreis: 6.87, Immobilienpreis: 1662.0, Leerstand: 2.5, Id: "Dortmund" }, // 2019,2019,2017
    {Name: "Düsseldorf", Mietpreis: 10.83, Immobilienpreis: 4378.0, Leerstand: 1.35, Id: "Duesseldorf" }, // 2021,2021,2019
    {Name: "Frankfurt", Mietpreis: 13.52, Immobilienpreis: 6196.0, Leerstand: 0.2, Id: "Frankfurt" }, // 2021, 2021, 2019
    {Name: "Hamburg", Mietpreis: 11.54, Immobilienpreis: 5357.0, Leerstand: 0.5, Id: "Hamburg" }, // 2021, 2021, 2019
    {Name: "Köln", Mietpreis: 11.30, Immobilienpreis: 4314.0, Leerstand: 0.88, Id: "Koeln" }, // 2018, 2021, 2019
    {Name: "München", Mietpreis: 16.95, Immobilienpreis: 8388.0, Leerstand: 0.2, Id: "Muenchen" } // 2021, 2021, 2019
  ]
  
  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  constructor(public dataClientService: DataClientService, public dataService: DataService) { }

  ngOnInit(): void {
   
  }

  onSort({column, direction}: SortEvent) {  
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    }); 
    // sorting countries
    if (direction === '' || column === '') {
      this.latestCityValues = this.latestCityValues;
    } else {
      this.latestCityValues = this.latestCityValues.sort((a, b) => {
        const res = compare(a[column], b[column]);
        return direction === 'asc' ? res : -res;
      });
    }
  }

  onClick(city: string) {
    this.dataClientService.selectCityEvent.emit(city);
  }
}
