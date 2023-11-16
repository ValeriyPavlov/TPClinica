import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { anyUserGuard } from './any-user.guard';

describe('anyUserGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => anyUserGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
