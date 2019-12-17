import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApptListTimeComponent } from './appt-list-time.component';

describe('ApptListTimeComponent', () => {
  let component: ApptListTimeComponent;
  let fixture: ComponentFixture<ApptListTimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApptListTimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApptListTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
