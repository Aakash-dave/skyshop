import { TestBed } from '@angular/core/testing';

import { ViewInteractionService } from './view-interaction.service';

describe('ViewInteractionService', () => {
  let service: ViewInteractionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewInteractionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
