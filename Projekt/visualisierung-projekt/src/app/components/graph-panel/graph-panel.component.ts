import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as d3 from 'd3';
import { DSVRowArray, svg } from 'd3';
import { City } from 'src/app/models/city';

@Component({
  selector: 'app-graph-panel',
  templateUrl: './graph-panel.component.html',
  styleUrls: ['./graph-panel.component.scss']
})
export class GraphPanelComponent implements OnInit {
  
  @Input() City: DSVRowArray;

  private width = 240;
  private height = 80;
  private margin = 20;


  // TODO: Put into seperate Service
  ngOnInit(): void {
    this.createChart(this.parseData(this.City))
  }

  private createChart (Citydata: any[]){
    var svg = d3.select('.graph-wrapper')
                 .append('svg')
                 .append('g')

    var xScale = d3.scaleTime().range([0,this.width]);
    var y1Scale = d3.scaleLinear().range([this.height, 0]);
    xScale.domain(<[Date, Date]>d3.extent(Citydata, function (d) { return d.Quartal; }));
    y1Scale.domain([d3.min(Citydata, (d) => {return d.Mietpreis}),
               d3.max(Citydata, (d) => {return d.Mietpreis})
              ]);

    svg.append('g')
       .attr('transform', 'translate(0,' + this.height + ')')
       .attr('class', 'x_axis')
       .call(d3.axisBottom(xScale).tickFormat(d3.timeFormat("%y") as unknown as (dv: number | { valueOf(): number; }, i: number) => string))

    svg.append('g')
       .attr('class', 'y_axis')
       .call(d3.axisLeft(y1Scale))
    console.log(Citydata)
    var linefunc = d3.line()
                  .defined((d:any) =>{return d.Mietpreis !== 0;})            
                  .x((d:any) => xScale(d.Quartal))
                  .y((d:any) =>y1Scale(d.Mietpreis))
                  

    svg.append('path')
        .datum(Citydata)
        .attr('class', 'line')
        .attr('d', linefunc)
  }

  private parseData(City: DSVRowArray): City[]{
    var parsedData: City[] = [];
    City.forEach(d => parsedData.push({Mietpreis: Number(d.Mietpreis), Quartal: this.parseDate(d.Quartal!), Leerstand: Number(d.Leerstand), Immobilienpreis: Number(d.Immobilienpreis)}));  
    parsedData.sort((a: City, b: City) => {
        return a.Quartal.getTime() - b.Quartal.getTime();
    });
    parsedData = parsedData.filter((City) => {return City.Quartal >= new Date("2004-01-01") })
    
    return parsedData;
  }

  private parseDate(QuartalDate: string): Date{
    if( QuartalDate !== null){
      var splitDate = QuartalDate.split(" ", 2);
      
      switch(splitDate[0]){
        case "Q1":
          return new Date(splitDate[1]+"-01-01")
          break;
        case "Q2":
          return new Date(splitDate[1]+"-05-01")
          break;
        case "Q3":
          return new Date(splitDate[1]+"-08-01")
          break;
        case "Q4":
          return new Date(splitDate[1]+"-11-01")
          break;
        default:
          return new Date('01 Jan 1970 00:00:00 GMT')
          break;
      }
    }
    else {
      return new Date('01 Jan 1970 00:00:00 GMT')
    }
  }
}
