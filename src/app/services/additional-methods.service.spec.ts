import { TestBed } from '@angular/core/testing';

import { AdditionalMethodsService } from './additional-methods.service';

describe('AdditionalMethodsService', () => {
  let service: AdditionalMethodsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdditionalMethodsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
