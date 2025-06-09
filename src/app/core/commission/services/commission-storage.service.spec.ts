import { TestBed } from '@angular/core/testing';

import { CommissionStorageService } from './commission-storage.service';

describe('CommissionStorageService', () => {
  let service: CommissionStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommissionStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
