import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarintoComponent } from './navbarinto.component';

describe('NavbarintoComponent', () => {
  let component: NavbarintoComponent;
  let fixture: ComponentFixture<NavbarintoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarintoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarintoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
