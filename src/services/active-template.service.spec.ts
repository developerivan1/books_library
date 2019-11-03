import { TestBed } from '@angular/core/testing';

import { ActiveTemplateService } from './active-template.service';

describe('ActiveTemplateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ActiveTemplateService = TestBed.get(ActiveTemplateService);
    expect(service).toBeTruthy();
  });
});
