import { ElementRef } from '@angular/core';
import { AppNumbersOnlyDirective } from './app-numbers-only.directive';

describe('AppNumbersOnlyDirective', () => {
  it('should create an instance', () => {
    // Create a mock ElementRef
    const mockElementRef = { nativeElement: {} } as ElementRef;

    // Pass the mock ElementRef to the directive
    const directive = new AppNumbersOnlyDirective(mockElementRef);

    expect(directive).toBeTruthy();
  });
});