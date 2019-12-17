import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApptNewComponent } from './appt-new.component';

describe('ApptNewComponent', () => {
  let component: ApptNewComponent;
  let fixture: ComponentFixture<ApptNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApptNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApptNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
