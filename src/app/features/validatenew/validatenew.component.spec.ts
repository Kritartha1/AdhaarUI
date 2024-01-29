import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidatenewComponent } from './validatenew.component';

describe('ValidatenewComponent', () => {
  let component: ValidatenewComponent;
  let fixture: ComponentFixture<ValidatenewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ValidatenewComponent]
    });
    fixture = TestBed.createComponent(ValidatenewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
