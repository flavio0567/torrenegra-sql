import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApptListExpenseComponent } from './appt-list-expense.component';

describe('ApptListExpenseComponent', () => {
  let component: ApptListExpenseComponent;
  let fixture: ComponentFixture<ApptListExpenseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApptListExpenseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApptListExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
