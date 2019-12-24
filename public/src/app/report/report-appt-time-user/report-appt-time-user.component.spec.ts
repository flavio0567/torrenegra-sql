import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportApptTimeUserComponent } from './report-appt-time-user.component';

describe('ReportApptTimeUserComponent', () => {
  let component: ReportApptTimeUserComponent;
  let fixture: ComponentFixture<ReportApptTimeUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportApptTimeUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportApptTimeUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
