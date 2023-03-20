import { TestBed } from '@angular/core/testing';

import { CallService } from './backend-call.service';

describe('BackendCallComponent', () => {
  let service: CallService;

  beforeEach(async () => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CallService);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });
});