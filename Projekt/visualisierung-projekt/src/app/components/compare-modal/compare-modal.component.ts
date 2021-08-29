import { Component, Input, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { DSVRowArray, ScaleTime, svg } from 'd3';
import { City } from 'src/app/models/city';

@Component({
  selector: 'app-compare-modal',
  templateUrl: './compare-modal.component.html',
  styleUrls: ['./compare-modal.component.scss']
})
export class CompareModalComponent implements OnInit {

  @Input() City: DSVRowArray;
  @Input() Id: string;
  @Input() citiesToCompare = new Map<string, DSVRowArray>();

  private width = 400;
  private height = 150;
  private marginLeft = 80;
  private marginBottom = 30

  private maxPreis= 80;
  private maxLeerstand=6;
  private minPreis=4;
  private minLeerstand=0;

  private svg: any;
  private xScale: ScaleTime<number, number, never>;
  private y1Scale: any;
  private y2Scale: any;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    console.log(this.citiesToCompare)

    this.createChart(this.parseData(this.citiesToCompare.get("Dortmund")!))
  }

  createChart(Citydata: any[]) {

    this.svg = d3.select('.compare-graph')
                 .append('g')
                 .attr("transform", "translate(" + this.marginLeft + "," + this.marginBottom + ")");

    // Scales vereinheitlichen
    this.xScale = d3.scaleTime().range([0,this.width]);
    this.y1Scale = d3.scaleLinear().range([this.height, 0]);
    this.y2Scale = d3.scaleLinear().range([this.height, 0]);

    this.xScale.domain(<[Date, Date]>d3.extent(Citydata, function (d) { return d.Quartal; }));
    
    this.y1Scale.domain([this.minPreis,this.maxPreis]);

    this.y2Scale.domain([this.minLeerstand, this.maxLeerstand]);

    // X-Axis Time
    this.svg.append('g')
        .attr('transform', 'translate(0,' + this.height + ')')
        .attr('class', 'x_axis')
        .call(d3.axisBottom(this.xScale).tickFormat(d3.timeFormat("%y") as unknown as (dv: number | { valueOf(): number; }, i: number) => string))
    
    // First Y-Axis Immobilien
    this.svg.append('g')
        .attr('class', 'y_axis')
        .call(d3.axisLeft(this.y1Scale))
    
    // Second Y-Axis Leerstand
    this.svg.append('g')
        .attr('class', 'y_axis')
        .attr("transform", "translate(" + this.width + " ,0)")   
        .call(d3.axisRight(this.y2Scale))




    // Add Axis labels
    this.svg.append("text")
        .style("font", "14px open-sans")
        .attr("class", "text-y1-axis")
        .attr("text-anchor", "middle")
        .attr("transform", "translate(" + (-this.marginLeft / 2) + "," + (this.height / 2) + ")rotate(-90)")
        .text("Preis pro Quadratmeter");

    this.svg.append("text")
        .style("font", "14px open-sans")
        .attr("class", "text-y2-axis")
        .attr("text-anchor", "middle")
        .attr("transform", "translate(" + (this.width + (this.marginLeft/2)) + "," + (this.height / 2) + ")rotate(90)")
        .text("Leerstand in Prozent");

    this.svg.append("text")
        .style("font", "14px open-sans")
        .attr("class", "text-x-axis")
        .attr("text-anchor", "middle")
        .attr("transform", "translate(" + (this.width / 2) + "," + (this.height + (this.marginBottom)) + ")")
        .text("Zeit");

    // Add City Name
    this.svg.append("text")
        .style("font", "14px open-sans")
        .attr("class", "text-name")
        .attr("text-anchor", "middle")
        .attr("transform", "translate(" + (this.width / 2) + "," + 0 + ")")
        .text(this.Id);
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
