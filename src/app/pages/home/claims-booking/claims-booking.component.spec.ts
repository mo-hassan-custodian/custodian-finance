import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimsBookingComponent } from './claims-booking.component';

describe('ClaimsBookingComponent', () => {
  let component: ClaimsBookingComponent;
  let fixture: ComponentFixture<ClaimsBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClaimsBookingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClaimsBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
