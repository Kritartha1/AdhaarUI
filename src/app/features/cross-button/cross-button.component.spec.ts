import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrossButtonComponent } from './cross-button.component';

describe('CrossButtonComponent', () => {
  let component: CrossButtonComponent;
  let fixture: ComponentFixture<CrossButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrossButtonComponent]
    });
    fixture = TestBed.createComponent(CrossButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
