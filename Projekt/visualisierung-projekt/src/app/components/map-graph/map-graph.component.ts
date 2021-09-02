import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { geoAlbers, GeoPath, GeoProjection } from 'd3';
import { FeatureCollection } from 'geojson';
import { Topology } from 'topojson-specification';
import * as topo from 'topojson-client';
import { DataClientService } from 'src/app/services/data-client.service';
import { DataService } from 'src/app/services/data.service';

// TODO: Remove
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
  
  private width = 1000;
  private height = 650;
  private widthDe = 280;
  private heightDe = 170;


  constructor(private _dataClientService: DataClientService, private _dataService: DataService) { }

  ngOnInit(): void {
    this.addMap(this.width, this.height);
    this.addMinimap(this.width, this.widthDe, this.heightDe)
  }

  selectCity(selectedCity: string) {
    this._dataClientService.selectCityEvent.emit(selectedCity);
  }

  private addMap(width: number, height: number) {
    const component = this;

    // Color Scale
    var myColor = d3.scaleSequential()
                    .interpolator(d3.interpolateInferno)
                    .domain([this._dataService.minPreis, 18])

    // Load GeoData
    d3.json('/assets/NRW.topojson')
      .then((data:any) => {
        var geoData: Topology;
        geoData = data as Topology;
        var nrw = topo.feature(geoData, geoData.objects.NRW) as FeatureCollection

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

        // Koeln
        d3.json('/assets/Koeln.topojson').then((dataCity:any) => {
          var geoDataCity: Topology;
          geoDataCity = dataCity as Topology;
          var de = topo.feature(geoDataCity, geoDataCity.objects.Koeln) as FeatureCollection

          path =d3.geoPath().projection(projection);

          g = svg.append('g');

          g.attr('class', 'map-city-heat')
            g.selectAll('path')
                .data(de.features)
                .enter()
                .append('path')
                .attr('d', path)
                .attr('style', 'stroke: red')
                .attr('id', 'Koeln-heat')
                .style("fill", () => { return myColor(11.3)})
                .on("click", function() {
                  var color = this.style.stroke == "red" ? "green" : "red";
                  d3.select(this).style("stroke", color);
                  component.selectCity("Koeln")     
                })
                .on("mouseover", function(d) {
                    var xPosition = d3.pointer(d)[0]
                    var yPosition = d3.pointer(d)[1] - 15

                    g.append("text")
                      .attr("class", "map-tooltip")
                      .attr("x", xPosition)
                      .attr("y", yPosition)
                      .attr("text-anchor", "middle")
                      .attr("font-family", "sans-serif")  
                      .attr("font-weight", "bold")
                      .text("Köln")
                })
                .on("mouseout", function() {
                  d3.select(".map-tooltip").remove()
                });
        })
        // Dortmund
        d3.json('/assets/Dortmund.topojson').then(function(dataCity:any) {
          var geoDataCity: Topology;
          geoDataCity = dataCity as Topology;
          var de = topo.feature(geoDataCity, geoDataCity.objects.Dortmund) as FeatureCollection

          path =d3.geoPath().projection(projection);

          g = svg.append('g');

          g.attr('class', 'map-city-heat')
            g.selectAll('path')
                .data(de.features)
                .enter()
                .append('path')
                .attr('d', path)
                .attr('style', 'stroke: red')
                .attr('id', 'Dortmund-heat')
                .style("fill", () => { return myColor(6.87)})
                .on("click", function() {
                  var color = this.style.stroke == "red" ? "green" : "red";
                  d3.select(this).style("stroke", color);
                  component.selectCity("Dortmund")     
                })
                .on("mouseover", function(d) {
                    var xPosition = d3.pointer(d)[0]
                    var yPosition = d3.pointer(d)[1] - 15

                    g.append("text")
                      .attr("class", "map-tooltip")
                      .attr("x", xPosition)
                      .attr("y", yPosition)
                      .attr("text-anchor", "middle")
                      .attr("font-family", "sans-serif")  
                      .attr("font-weight", "bold")
                      .text("Dortmund")
                })
                .on("mouseout", function() {
                  d3.select(".map-tooltip").remove()
                });
        })
        // Duesseldorf
        d3.json('/assets/Duesseldorf.topojson').then(function(dataCity:any) {
          var geoDataCity: Topology;
          geoDataCity = dataCity as Topology;
          var de = topo.feature(geoDataCity, geoDataCity.objects.Duesseldorf) as FeatureCollection

          path =d3.geoPath().projection(projection);

          g = svg.append('g');

          g.attr('class', 'map-city-heat')
            g.selectAll('path')
                .data(de.features)
                .enter()
                .append('path')
                .attr('d', path)
                .attr('style', 'stroke: red')
                .attr('id', 'Duesseldorf-heat')
                .style("fill", () => { return myColor(10.83)})
                .on("click", function() {
                  var color = this.style.stroke == "red" ? "green" : "red";
                  d3.select(this).style("stroke", color);
                  component.selectCity("Duesseldorf")     
                })
                .on("mouseover", function(d) {
                    var xPosition = d3.pointer(d)[0]
                    var yPosition = d3.pointer(d)[1] - 15

                    g.append("text")
                      .attr("class", "map-tooltip")
                      .attr("x", xPosition)
                      .attr("y", yPosition)
                      .attr("text-anchor", "middle")
                      .attr("font-family", "sans-serif")  
                      .attr("font-weight", "bold")
                      .text("Düsseldorf")
                })
                .on("mouseout", function() {
                  d3.select(".map-tooltip").remove()
                });
        })
      })
      .catch((error) =>{
        console.log(error);
      })
  }

  private addMinimap(width: number ,widthDe:number, heightDe: number) {
    // Mini Map Germany      
    d3.json('/assets/DE.topojson').then(function(dataDE:any) {
      var geoDataDE: Topology;
      geoDataDE = dataDE as Topology;
      var de = topo.feature(geoDataDE, geoDataDE.objects.DE) as FeatureCollection

      // Projection of DE Map    
      var projectionDE = d3.geoMercator().fitSize([widthDe,heightDe], de);

      var svgDE = d3.select('.map-wrapper')
                .append('svg')
                .attr('width', widthDe)
                .attr('height', heightDe)
                .attr("transform", "translate(" + (width / 3) + "," + 0 + ")")

      var path =d3.geoPath().projection(projectionDE);

      var gDe = svgDE.append('g');
      
      gDe.attr('class', 'map-de')
          gDe.selectAll('path')
            .data(de.features)
            .enter()
            .append('path')
            .attr('d', path);
      // Mini Map NRW
      d3.json('/assets/NRW.topojson').then(function(dataDE:any) {
        var geoDataDE: Topology;
        geoDataDE = dataDE as Topology;
        var de = topo.feature(geoDataDE, geoDataDE.objects.NRW) as FeatureCollection

        path =d3.geoPath().projection(projectionDE);

        gDe = svgDE.append('g');

        gDe.attr('class', 'map-de-nrw')
            gDe.selectAll('path')
              .data(de.features)
              .enter()
              .append('path')
              .attr('d', path);
      })
    })
  }
}