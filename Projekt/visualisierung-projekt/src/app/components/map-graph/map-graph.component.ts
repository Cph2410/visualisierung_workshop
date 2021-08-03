import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { svg } from 'd3';
import { FeatureCollection, GeoJsonProperties } from 'geojson';
import * as topo from 'topojson-client';
import { Objects, Topology } from 'topojson-specification';

@Component({
  selector: 'app-map-graph',
  templateUrl: './map-graph.component.html',
  styleUrls: ['./map-graph.component.scss']
})
export class MapGraphComponent implements OnInit {

  
  private width = 800;
  private height = 600;

  

  constructor() { }

  ngOnInit(): void {
    this.createMapSvg();
  }

  private createMapSvg() {

    var path = d3.geoPath(null);

    var svg = d3.select('#map')
                 .append('svg')
                 .attr('width', this.width)
                 .attr('height', this.height)
                 .append('g')
                 .attr('transform', 'tanslate('+10+','+10+')');

    // svg.append('path')
    //    .datum(topo.feature(nrw, nrw.objects.subunits))
    //    .attr('d', path)



    d3.json('/assets/nrwGeoJson.json')
      .then(function(data:any) {
        var nrw = topo.feature(data, data.objects.nrwGeoJson)
        svg.append('path')
         .datum(nrw)
         .attr('d', path)

         
      })
      .catch((error) =>{
        console.log(error);
      })   
  }
}