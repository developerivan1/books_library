import { TestBed } from '@angular/core/testing';

import { ImMemoryDataService } from './data.service';

describe('DataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ImMemoryDataService = TestBed.get(ImMemoryDataService);
    expect(service).toBeTruthy();
  });
});
