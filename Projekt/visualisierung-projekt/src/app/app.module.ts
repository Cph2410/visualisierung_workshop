import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularSplitModule } from 'angular-split';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { MapGraphComponent } from './components/map-graph/map-graph.component';
import { GraphPanelComponent } from './components/graph-panel/graph-panel.component';
import { PanelOverviewComponent } from './components/panel-overview/panel-overview.component';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { PanelControllComponent } from './components/panel-controll/panel-controll.component';
import { PanelContainerComponent } from './components/panel-container/panel-container.component';
import { CompareModalComponent } from './components/compare-modal/compare-modal.component';
import { FormsModule } from '@angular/forms';
import { NgbdSortableHeader, RankingComponent } from './components/ranking/ranking.component';

@NgModule({
  declarations: [
    AppComponent,
    MapGraphComponent,
    GraphPanelComponent,
    PanelOverviewComponent,
    HeaderComponent,
    FooterComponent,
    PanelControllComponent,
    PanelContainerComponent,
    CompareModalComponent,
    RankingComponent,
    NgbdSortableHeader
  ],
  imports: [
    BrowserModule,
    AngularSplitModule,
    HttpClientModule,
    FlexLayoutModule,
    NgbModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
