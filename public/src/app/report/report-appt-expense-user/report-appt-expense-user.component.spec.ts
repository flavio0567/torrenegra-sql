import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportApptExpenseUserComponent } from './report-appt-expense-user.component';

describe('ReportApptExpenseUserComponent', () => {
  let component: ReportApptExpenseUserComponent;
  let fixture: ComponentFixture<ReportApptExpenseUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportApptExpenseUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportApptExpenseUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
