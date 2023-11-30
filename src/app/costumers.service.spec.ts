import { TestBed } from '@angular/core/testing';

import { CostumersService } from './costumers.service';

describe('CostumersService', () => {
  let service: CostumersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CostumersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
