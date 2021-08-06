import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { geoAlbers } from 'd3';
import { FeatureCollection } from 'geojson';
import { Topology } from 'topojson-specification';
import * as topo from 'topojson-client';
import { DataClientService } from 'src/app/services/data-client.service';

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

        
    var projection = d3.geoMercator().fitSize([width,height], nrw);

    var svg = d3.select('.map-wrapper')
                 .append('svg')
                 .attr('width', width)
                 .attr('height', height)

    var path =d3.geoPath().projection(projection);
   
    var g = svg.append('g');

    g.attr('class', 'map')

        g.selectAll('path')
          .data(nrw.features)
          .enter()
          .append('path')
          .attr('d', path);
      })
      .catch((error) =>{
        console.log(error);
      })   
  }
}