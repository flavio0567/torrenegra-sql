import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApptDashboardComponent } from './appt-dashboard.component';

describe('ApptDashboardComponent', () => {
  let component: ApptDashboardComponent;
  let fixture: ComponentFixture<ApptDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApptDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApptDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
