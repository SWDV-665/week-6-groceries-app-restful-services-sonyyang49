import { TestBed } from '@angular/core/testing';

import { InputDialogService } from './input-dialog.service';

describe('InputDialogService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InputDialogService = TestBed.get(InputDialogService);
    expect(service).toBeTruthy();
  });
});
