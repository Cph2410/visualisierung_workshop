import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelControllComponent } from './panel-controll.component';

describe('PanelControllComponent', () => {
  let component: PanelControllComponent;
  let fixture: ComponentFixture<PanelControllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanelControllComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelControllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
