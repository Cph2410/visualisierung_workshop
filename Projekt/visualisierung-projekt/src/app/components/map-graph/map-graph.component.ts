import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { geoAlbers } from 'd3';
import { FeatureCollection } from 'geojson';
import { Topology } from 'topojson-specification';
import * as topo from 'topojson-client';
import { DataClientService } from 'src/app/services/data-client.service';


const citiesNrw = [
  {name: "Koeln",
  lat:  50.93541739830901, 
  long: 6.945500982364537},
  {name: "Dortmund",
  lat:  51.509090025453766, 
  long: 7.450872080986509 },
  {name: "Duesseldorf",
  lat:  51.221857299595584, 
  long: 6.790319092260928} 
]

@Component({
  selector: 'app-map-graph',
  templateUrl: './map-graph.component.html',
  styleUrls: ['./map-graph.component.scss']
})
export class MapGraphComponent implements OnInit {
  
  private width = 800;
  private height = 600;



  constructor(private _dataService: DataClientService) { }

  ngOnInit(): void {
    this.createMapSvg(this.width, this.height);
  }

  selectCity(selectedCity: string) {
    this._dataService.selectCityEvent.emit(selectedCity);
  }

  private createMapSvg(width: number, height: number) {
    // Load GeoData
    d3.json('/assets/nrwTopoJson.topojson')
      .then(function(data:any) {
        var geoData: Topology;
        geoData = data as Topology;
        var nrw = topo.feature(geoData, geoData.objects.nrwGeoJson) as FeatureCollection

    // Projection of Map    
    var projection = d3.geoMercator().fitSize([width,height], nrw);

    var svg = d3.select('.map-wrapper')
                 .append('svg')
                 .attr('width', width)
                 .attr('height', height)

    var path =d3.geoPath().projection(projection);
   
    var g = svg.append('g');
    // Map
    g.attr('class', 'map')
        g.selectAll('path')
          .data(nrw.features)
          .enter()
          .append('path')
          .attr('d', path);
        // Cities
        g.selectAll('circle')
          .data(citiesNrw)
          .enter()
           .append("circle")
           .attr("cx", function(d) {
                   return projection([d.long, d.lat])![0];
           })
           .attr("cy", function(d) {
                   return projection([d.long, d.lat])![1];
           })
           .attr("r", 5)
           .style("fill", "red")
           .on("click", function(d) {
              d3.selectAll('circle').style("fill", "red")
              d3.select(this).style("fill", "green")
           })
           .on("mouseover", function(d, i) {
              var xPosition = d3.pointer(d)[0]
              var yPosition = d3.pointer(d)[1] - 15

              g.append("text")
                .attr("id", "tooltip")
                .attr("x", xPosition)
                .attr("y", yPosition)
                .attr("text-anchor", "middle")
                .attr("font-family", "sans-serif")
                .attr("font-size", "11px")
                .attr("font-weight", "bold")
                .attr("fill", "white")
                .text(i.name)
           })
           .on("mouseout", function(d) {
            d3.select("#tooltip").remove()
           });
      })
      .catch((error) =>{
        console.log(error);
      })  
  }
}