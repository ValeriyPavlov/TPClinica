import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { specialistGuard } from './specialist.guard';

describe('specialistGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => specialistGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
