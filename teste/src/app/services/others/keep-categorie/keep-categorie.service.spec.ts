import { TestBed } from '@angular/core/testing';

import { KeepCategorieService } from './keep-categorie.service';

describe('KeepCategorieService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: KeepCategorieService = TestBed.get(KeepCategorieService);
    expect(service).toBeTruthy();
  });
});
