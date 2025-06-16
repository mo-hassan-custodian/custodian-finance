import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvertToProposalComponent } from './convert-to-proposal.component';

describe('ConvertToProposalComponent', () => {
  let component: ConvertToProposalComponent;
  let fixture: ComponentFixture<ConvertToProposalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConvertToProposalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConvertToProposalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
