import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FailurePopupComponent } from './failure-popup.component';

describe('FailurePopupComponent', () => {
  let component: FailurePopupComponent;
  let fixture: ComponentFixture<FailurePopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FailurePopupComponent]
    });
    fixture = TestBed.createComponent(FailurePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
