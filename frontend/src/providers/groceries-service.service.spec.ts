import { TestBed } from '@angular/core/testing';

import { GroceriesServiceService } from './groceries-service.service';

describe('GroceriesServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GroceriesServiceService = TestBed.get(GroceriesServiceService);
    expect(service).toBeTruthy();
  });
});
