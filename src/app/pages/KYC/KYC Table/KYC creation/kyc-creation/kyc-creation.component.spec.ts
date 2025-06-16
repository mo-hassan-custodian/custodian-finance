import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KycCreationComponent } from './kyc-creation.component';

describe('KycCreationComponent', () => {
  let component: KycCreationComponent;
  let fixture: ComponentFixture<KycCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KycCreationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KycCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
