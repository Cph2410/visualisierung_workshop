import { TestBed } from '@angular/core/testing';

import { DataClientServiceService } from './data-client-service.service';

describe('DataClientServiceService', () => {
  let service: DataClientServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataClientServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
