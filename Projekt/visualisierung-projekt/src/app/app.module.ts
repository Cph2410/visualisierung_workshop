import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularSplitModule } from 'angular-split';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { MapGraphComponent } from './components/map-graph/map-graph.component';
import { GraphPanelComponent } from './components/graph-panel/graph-panel.component';
import { PanelOverviewComponent } from './components/panel-overview/panel-overview.component';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    MapGraphComponent,
    GraphPanelComponent,
    PanelOverviewComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AngularSplitModule,
    HttpClientModule,
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
