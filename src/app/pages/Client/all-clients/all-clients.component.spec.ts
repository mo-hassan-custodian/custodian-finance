import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllCLientsComponent } from './all-clients.component';

describe('AllCLientsComponent', () => {
  let component: AllCLientsComponent;
  let fixture: ComponentFixture<AllCLientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllCLientsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllCLientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
