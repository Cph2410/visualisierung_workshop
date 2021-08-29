import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as d3 from 'd3';
import { DSVRowArray, ScaleTime, svg } from 'd3';
import { City } from 'src/app/models/city';

@Component({
  selector: 'app-graph-panel',
  templateUrl: './graph-panel.component.html',
  styleUrls: ['./graph-panel.component.scss']
})
export class GraphPanelComponent implements OnInit, AfterViewInit {
  
  @Input() City: DSVRowArray;
  @Input() Id: string;
  @Input() maxPreis: number;
  @Input() maxLeerstand: number;
  @Input() minPreis: number;
  @Input() minLeerstand: number;

  private width = 400;
  private height = 150;
  private marginLeft = 80;
  private marginBottom = 30

  private svg: any;
  private xScale: ScaleTime<number, number, never>;
  private y1Scale: any;
  private y2Scale: any;

  // TODO: Put into seperate Service
  ngOnInit(): void {
    
  }

  ngAfterViewInit(): void {
    // Create SVG after Component Init so that the Custom Id works for selection
    this.svg = d3.select('#'+this.Id)
                 .append('g')
                 .attr("transform", "translate(" + this.marginLeft + "," + this.marginBottom + ")");
    
    this.createChart(this.parseData(this.City))
  }

  private createChart (Citydata: any[]){
    console.log(Citydata)
    
    // Scales vereinheitlichen
    this.xScale = d3.scaleTime().range([0,this.width]);
    this.y1Scale = d3.scaleLinear().range([this.height, 0]);
    this.y2Scale = d3.scaleLinear().range([this.height, 0]);

    this.xScale.domain(<[Date, Date]>d3.extent(Citydata, function (d) { return d.Quartal; }));
    // this.y1Scale.domain([d3.min(Citydata, (d) => {return (d.Immobilienpreis)}),
    //             d3.max(Citydata, (d) => {return d.Immobilienpreis})
    //           ]);
    
    // this.y2Scale.domain([d3.min(Citydata, (d) => {return d.Leerstand}),
    //             d3.max(Citydata, (d) => {return d.Leerstand})
    //           ]);
    
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

    // Line Generator Mietpreis
    var linefuncMietpreis = d3.line()
                  .defined((d:any) =>{return d.Mietpreis !== 0;})            
                  .x((d:any) => this.xScale(d.Quartal))
                  .y((d:any) =>this.y1Scale(d.Mietpreis))
    
    // Line Generator Immobilienpreis
    var linefuncImmopreis = d3.line()
                  .defined((d:any) =>{return d.Immobilienpreis !== 0;})            
                  .x((d:any) => this.xScale(d.Quartal))
                  .y((d:any) =>this.y2Scale((d.Immobilienpreis/10)))
    
    // Line Generator Leerstand
    var linefuncLeerstand = d3.line()
                  .defined((d:any) =>{return d.Leerstand !== 0;})            
                  .x((d:any) => this.xScale(d.Quartal))
                  .y((d:any) => this.y2Scale(d.Leerstand))
      
    // Line Miete
    this.svg.append('path')
        .datum(Citydata)
        .attr('class', 'line-mietpreis')
        .attr('d', linefuncMietpreis)
        .on("mouseover", (d: any, i: any) => {
          var xPosition = d3.pointer(d)[0]
          var yPosition = d3.pointer(d)[1]
          
          var mietpreisIndex = Math.round((xPosition / this.width * (i.length - 1)))

          d3.select('#mietpreis-tooltip')
            .style("left", xPosition + "px")
            .style("top", yPosition + "px")
            .select("#value")
            .text(`${i[mietpreisIndex].Mietpreis}`)

          d3.select("#mietpreis-tooltip").classed("hidden", false)

        })
        .on("mouseout", function() {
        d3.select("#mietpreis-tooltip").classed("hidden", true)
        });

    // Line Leerstand
    this.svg.append('path')
        .datum(Citydata)
        .attr('class', 'line-leerstand')
        .attr('d', linefuncLeerstand)
        .on("mouseover", (d: any, i: any) => {
          var xPosition = d3.pointer(d)[0]
          var yPosition = d3.pointer(d)[1]
          
          var leerstandIndex = Math.round((xPosition / this.width * (i.length - 1)))

          d3.select('#leerstand-tooltip')
            .style("left", xPosition + "px")
            .style("top", yPosition + "px")
            .select("#value")
            .text(`${i[leerstandIndex].Leerstand}`)

          d3.select("#leerstand-tooltip").classed("hidden", false)

        })
        .on("mouseout", function() {
        d3.select("#leerstand-tooltip").classed("hidden", true)
        });

    // Line Immo
    this.svg.append('path')
        .datum(Citydata)
        .attr('class', 'line-immopreis')
        .attr('d', linefuncImmopreis)
        .on("mouseover", (d: any, i: any) => {
          var xPosition = d3.pointer(d)[0]
          var yPosition = d3.pointer(d)[1]
          
          var immopreisIndex = Math.round((xPosition / this.width * (i.length - 1)))

          d3.select('#immopreis-tooltip')
            .style("left", xPosition + "px")
            .style("top", yPosition + "px")
            .select("#value")
            .text(`${i[immopreisIndex].Immobilienpreis}`)

          d3.select("#immopreis-tooltip").classed("hidden", false)

        })
        .on("mouseout", function() {
        d3.select("#immopreis-tooltip").classed("hidden", true)
        });

    


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
