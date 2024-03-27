import { TestBed } from '@angular/core/testing';

import { TestingqueueService } from './testingqueue.service';

describe('TestingqueueService', () => {
  let service: TestingqueueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TestingqueueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
