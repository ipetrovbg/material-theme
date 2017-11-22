import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LedgerNavigationComponent } from './ledger-navigation.component';

describe('LedgerNavigationComponent', () => {
  let component: LedgerNavigationComponent;
  let fixture: ComponentFixture<LedgerNavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LedgerNavigationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LedgerNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
