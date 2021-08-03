import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularSplitModule } from 'angular-split';


import { AppComponent } from './app.component';
import { MapGraphComponent } from './components/map-graph/map-graph.component';
import { GraphPanelComponent } from './components/graph-panel/graph-panel.component';
import { PanelOverviewComponent } from './components/panel-overview/panel-overview.component';

@NgModule({
  declarations: [
    AppComponent,
    MapGraphComponent,
    GraphPanelComponent,
    PanelOverviewComponent
  ],
  imports: [
    BrowserModule,
    AngularSplitModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
