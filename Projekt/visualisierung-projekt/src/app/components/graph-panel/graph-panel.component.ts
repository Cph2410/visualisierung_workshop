import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as d3 from 'd3';
import { DSVRowArray, ScaleTime, svg } from 'd3';
import { City } from 'src/app/models/city';
import { DataService } from 'src/app/services/data.service';

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
  private legend: any;
  private xScale: ScaleTime<number, number, never>;
  private y1Scale: any;
  private y2Scale: any;

  constructor(private _dataService: DataService){}

  // TODO: Put into seperate Service
  ngOnInit(): void {
    
  }

  ngAfterViewInit(): void {
    // Create SVG after Component Init so that the Custom Id works for selection
    this.svg = d3.select('#'+this.Id)
                 .append('g')
                 .attr("transform", "translate(" + this.marginLeft + "," + this.marginBottom + ")");
    
    this.createChart(this._dataService.parseData(this.City))
    this.plotChart(this._dataService.parseData(this.City))
  }

  private createChart (Citydata: any[]){
    // Scales vereinheitlichen
    this.xScale = d3.scaleTime().range([0,this.width]);
    this.y1Scale = d3.scaleLinear().range([this.height, 0]);
    this.y2Scale = d3.scaleLinear().range([this.height, 0]);

    this.xScale.domain(<[Date, Date]>d3.extent(Citydata, function (d) { return d.Quartal; }));
    
    this.y1Scale.domain([this._dataService.minPreis,this._dataService.maxPreis]);

    this.y2Scale.domain([this._dataService.minLeerstand, this._dataService.maxLeerstand]);

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

     // Add Legend for Lines
     this.legend = this.svg.append('g')
                            .attr('class', 'legend-lines')

     this.legend.append("line")
        .attr("width", 20)
        .attr("x1", 10)
        .attr("x2", this.width-350)
        .attr("y1", 15)
        .attr("y2", 15)
        .attr('class', 'line-mietpreis')

    this.legend.append("text")
        .attr('class', 'text-mietpreis')
        .style("font", "10px open-sans")
        .attr("x", this.width-250)
        .attr("y", 17)
        .style("text-anchor", "end")
        .text('Mietpreise');  

    this.legend.append("line")
        .attr("width", 20)
        .attr("x1", 10)
        .attr("x2", this.width-350)
        .attr("y1", 30)
        .attr("y2", 30)
        .attr('class', 'line-immopreis')

    this.legend.append("text")
        .attr('class', 'text-immopreis')
        .style("font", "10px open-sans")
        .attr("x", this.width-250)
        .attr("y",  32)
        .style("text-anchor", "end")
        .text('Immobilienpreise * 100');       

    this.legend.append("line")
        .attr("x1", 10)
        .attr("x2", this.width-350)
        .attr("y1", 45)
        .attr("y2", 45)
        .attr('class', 'line-leerstand')

    this.legend.append("text")
        .attr('class', 'text-leerstand')
        .style("font", "10px open-sans")
        .attr("x", this.width-250)
        .attr("y", 47)
        .style("text-anchor", "end")
        .text('Leerstand in Prozent');  
  }


  plotChart(Citydata: any[]) {
    // Line Generator Mietpreis
    var linefuncMietpreis = d3.line()     
        .x((d:any) => this.xScale(d.Quartal))
        .y((d:any) =>this.y1Scale(d.Mietpreis))
       

    // Line Generator Immobilienpreis
    var linefuncImmopreis = d3.line()            
        .x((d:any) => this.xScale(d.Quartal))
        .y((d:any) =>this.y1Scale((d.Immobilienpreis)))

    // Line Generator Leerstand
    var linefuncLeerstand = d3.line()          
        .x((d:any) => this.xScale(d.Quartal))
        .y((d:any) => this.y2Scale(d.Leerstand))

    // Line Miete
    this.svg.append('path')
            .datum(this._dataService.filterNullValuesMiete(Citydata))
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
    .datum(this._dataService.filterNullValuesLeerstand(Citydata))
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
    .datum(this._dataService.filterNullValuesImmo(Citydata))
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
  }
}
