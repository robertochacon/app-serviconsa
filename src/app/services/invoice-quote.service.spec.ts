import { TestBed } from '@angular/core/testing';

import { InvoiceQuoteService } from './invoice-quote.service';

describe('InvoiceQuoteService', () => {
  let service: InvoiceQuoteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvoiceQuoteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
