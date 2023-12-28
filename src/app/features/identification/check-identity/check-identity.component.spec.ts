import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckIdentityComponent } from './check-identity.component';

describe('CheckIdentityComponent', () => {
  let component: CheckIdentityComponent;
  let fixture: ComponentFixture<CheckIdentityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CheckIdentityComponent]
    });
    fixture = TestBed.createComponent(CheckIdentityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
