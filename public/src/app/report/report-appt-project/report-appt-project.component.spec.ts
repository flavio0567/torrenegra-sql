import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportApptProjectComponent } from './report-appt-project.component';

describe('ReportApptProjectComponent', () => {
  let component: ReportApptProjectComponent;
  let fixture: ComponentFixture<ReportApptProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportApptProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportApptProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
