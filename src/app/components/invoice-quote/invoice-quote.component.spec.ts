import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceQuoteComponent } from './invoice-quote.component';

describe('InvoiceQuoteComponent', () => {
  let component: InvoiceQuoteComponent;
  let fixture: ComponentFixture<InvoiceQuoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoiceQuoteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceQuoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
