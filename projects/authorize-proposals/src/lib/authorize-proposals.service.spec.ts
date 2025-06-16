import { TestBed } from '@angular/core/testing';

import { AuthorizeProposalsService } from './authorize-proposals.service';

describe('AuthorizeProposalsService', () => {
  let service: AuthorizeProposalsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthorizeProposalsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
