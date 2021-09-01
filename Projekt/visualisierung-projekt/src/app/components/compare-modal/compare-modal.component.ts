import { Component, Input, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { DSVRowArray, ScaleTime, svg } from 'd3';
import { DataService } from 'src/app/services/data.service';

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

  private svg: any;
  private xScale: ScaleTime<number, number, never>;
  private y1Scale: any;
  private y2Scale: any;

  constructor(private _dataService: DataService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.createCompareChart(this._dataService.parseData(this.citiesToCompare.values().next().value));
    this.citiesToCompare.forEach((City, CityName) => {
      this.plotCompareChart(this._dataService.parseData(City), CityName)
    });
  }

  private createCompareChart(Citydata: any[]) {

    this.svg = d3.select('.compare-graph')
                 .append('g')
                 .attr("transform", "translate(" + this.marginLeft + "," + this.marginBottom + ")");

    // Scales vereinheitlichen
    this.xScale = d3.scaleTime().range([0,this.width]);
    this.y1Scale = d3.scaleLinear().range([this.height, 0]);
    this.y2Scale = d3.scaleLinear().range([this.height, 0]);
    // TODO: One Date for every Plot
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
  }

  private plotCompareChart(Citydata: any[], CityName: string) {
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
            .attr('class', 'compare-line')
            .attr('id', 'line-mietpreis-'+CityName)
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
    .attr('class', 'compare-line')
    .attr('id', 'line-leerstand-'+CityName)
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
    .attr('class', 'compare-line')
    .attr('id', 'line-immopreis-'+CityName)
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
