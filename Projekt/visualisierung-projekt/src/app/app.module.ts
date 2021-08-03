import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularSplitModule } from 'angular-split';


import { AppComponent } from './app.component';
import { MapGraphComponent } from './components/map-graph/map-graph.component';
import { GraphPanelComponent } from './components/graph-panel/graph-panel.component';
import { PanelOverviewComponent } from './components/panel-overview/panel-overview.component';
import { MainComponent } from './components/main/main.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    MapGraphComponent,
    GraphPanelComponent,
    PanelOverviewComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    AngularSplitModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
