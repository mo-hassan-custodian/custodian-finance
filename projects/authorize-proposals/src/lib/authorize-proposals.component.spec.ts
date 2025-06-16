import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorizeProposalsComponent } from './authorize-proposals.component';

describe('AuthorizeProposalsComponent', () => {
  let component: AuthorizeProposalsComponent;
  let fixture: ComponentFixture<AuthorizeProposalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthorizeProposalsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthorizeProposalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
