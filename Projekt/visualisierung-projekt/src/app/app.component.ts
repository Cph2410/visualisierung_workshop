import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { SplitAreaDirective, SplitComponent } from 'angular-split';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'visualisierung-projekt';
  direction = 'horizontal';

  @ViewChild('split') split: SplitComponent
  @ViewChild('area1') area1: SplitAreaDirective
  @ViewChild('area2') area2: SplitAreaDirective


  sizes = {
    percent: {
      area1: 30,
      area2: 70,
    },
    pixel: {
      area1: 120,
      area2: '*',
      area3: 160,
    },
  }

  dragEnd(unit, { sizes }) {
    if (unit === 'percent') {
      this.sizes.percent.area1 = sizes[0]
      this.sizes.percent.area2 = sizes[1]
    } else if (unit === 'pixel') {
      this.sizes.pixel.area1 = sizes[0]
      this.sizes.pixel.area2 = sizes[1]
      this.sizes.pixel.area3 = sizes[2]
    }
  }
}
