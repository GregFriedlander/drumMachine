import { TestBed } from '@angular/core/testing';

import { ChordConstructorService } from './chord-constructor.service';

describe('ChordConstructorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChordConstructorService = TestBed.get(ChordConstructorService);
    expect(service).toBeTruthy();
  });
});
