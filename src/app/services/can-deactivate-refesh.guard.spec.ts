import { TestBed } from '@angular/core/testing';

import { CanDeactivateRefeshGuard } from './can-deactivate-refesh.guard';

describe('CanDeactivateRefeshGuard', () => {
  let guard: CanDeactivateRefeshGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CanDeactivateRefeshGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
