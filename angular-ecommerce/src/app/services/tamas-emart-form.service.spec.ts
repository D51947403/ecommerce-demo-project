import { TestBed } from '@angular/core/testing';

import { TamasEmartFormService } from './tamas-emart-form.service';

describe('TamasEmartFormService', () => {
  let service: TamasEmartFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TamasEmartFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
