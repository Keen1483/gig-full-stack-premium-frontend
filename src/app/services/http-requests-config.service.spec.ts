import { TestBed } from '@angular/core/testing';

import { HttpRequestsConfigService } from './http-requests-config.service';

describe('HttpRequestsConfigService', () => {
  let service: HttpRequestsConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpRequestsConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
