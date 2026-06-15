import { render } from '@testing-library/angular';
import { describe, expect, it } from 'vitest';
import { LmnArrowRightStartOnRectangleIcon } from './arrow-right-start-on-rectangle';

describe('LmnArrowRightStartOnRectangleIcon', () => {
  it('renders an svg', async () => {
    const { fixture } = await render(LmnArrowRightStartOnRectangleIcon);
    expect(fixture.nativeElement.querySelector('svg')).toBeInTheDocument();
  });

  it('is aria-hidden by default', async () => {
    const { fixture } = await render(LmnArrowRightStartOnRectangleIcon);
    expect(fixture.nativeElement.getAttribute('aria-hidden')).toBe('true');
  });

  it('accepts animate input as boolean', async () => {
    const { fixture } = await render(LmnArrowRightStartOnRectangleIcon, {
      componentInputs: { animate: true },
    });
    expect(fixture.componentInstance.animate()).toBe(true);
  });
});
