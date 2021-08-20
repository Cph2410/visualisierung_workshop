import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as d3 from 'd3';
import { DSVRowArray, svg } from 'd3';
import { City } from 'src/app/models/city';

@Component({
  selector: 'app-graph-panel',
  templateUrl: './graph-panel.component.html',
  styleUrls: ['./graph-panel.component.scss']
})
export class GraphPanelComponent implements OnInit, AfterViewInit {
  
  @Input() City: DSVRowArray;
  @Input() Id: string;
  private width = 400;
  private height = 150;
  private margin = 30;

  // TODO: Put into seperate Service
  ngOnInit(): void {
    
  }

  ngAfterViewInit(): void {
    this.createChart(this.parseData(this.City))
  }
  private createChart (Citydata: any[]){
    console.log(Citydata)
    var svg = d3.select('#'+this.Id)
                 .append('g')
                 .attr("transform", "translate(" + this.margin + "," + this.margin + ")");

    var xScale = d3.scaleTime().range([0,this.width]);
    var y1Scale = d3.scaleLinear().range([this.height, 0]);
    var y2Scale = d3.scaleLinear().range([this.height, 0]);

    xScale.domain(<[Date, Date]>d3.extent(Citydata, function (d) { return d.Quartal; }));
    y1Scale.domain([d3.min(Citydata, (d) => {return (d.Immobilienpreis)}),
                d3.max(Citydata, (d) => {return d.Immobilienpreis})
              ]);
    
    y2Scale.domain([d3.min(Citydata, (d) => {return d.Leerstand}),
                d3.max(Citydata, (d) => {return d.Leerstand})
              ]);

    svg.append('g')
       .attr('transform', 'translate(0,' + this.height + ')')
       .attr('class', 'x_axis')
       .call(d3.axisBottom(xScale).tickFormat(d3.timeFormat("%y") as unknown as (dv: number | { valueOf(): number; }, i: number) => string))

    svg.append('g')
       .attr('class', 'y_axis')
       .call(d3.axisLeft(y1Scale))
      
    svg.append('g')
       .attr('class', 'y_axis')
       .attr("transform", "translate(" + this.width + " ,0)")   
       .call(d3.axisRight(y2Scale))

    var linefuncMietpreis = d3.line()
                  .defined((d:any) =>{return d.Mietpreis !== 0;})            
                  .x((d:any) => xScale(d.Quartal))
                  .y((d:any) =>y1Scale(d.Mietpreis))

    var linefuncImmopreis = d3.line()
                  .defined((d:any) =>{return d.Immobilienpreis !== 0;})            
                  .x((d:any) => xScale(d.Quartal))
                  .y((d:any) =>y2Scale((d.Immobilienpreis/10)))
    
    var linefuncLeerstand = d3.line()
                  .defined((d:any) =>{return d.Leerstand !== 0;})            
                  .x((d:any) => xScale(d.Quartal))
                  .y((d:any) =>y2Scale(d.Leerstand))
      

    svg.append('path')
        .datum(Citydata)
        .attr('class', 'line-mietpreis')
        .attr('d', linefuncMietpreis)

    
    svg.append('path')
        .datum(Citydata)
        .attr('class', 'line-leerstand')
        .attr('d', linefuncLeerstand)
      
    svg.append('path')
        .datum(Citydata)
        .attr('class', 'line-immopreis')
        .attr('d', linefuncImmopreis)
  }

  private parseData(City: DSVRowArray): City[]{
    var parsedData: City[] = [];
    City.forEach(d => parsedData.push({Mietpreis: Number(d.Mietpreis), Quartal: this.parseDate(d.Quartal!), Leerstand: Number(d.Leerstand), Immobilienpreis: Number(d.Immobielienpreis)}));  
    parsedData.sort((a: City, b: City) => {
        return a.Quartal.getTime() - b.Quartal.getTime();
    });
    parsedData = parsedData.filter((City) => {return City.Quartal >= new Date("2004-01-01") })
    parsedData.forEach((City) => {
      City.Immobilienpreis = City.Immobilienpreis/100
    })
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
