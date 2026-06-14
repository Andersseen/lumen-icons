import { render } from '@testing-library/angular';
import { describe, expect, it } from 'vitest';
import { LmnArrowRightCircleIcon } from './arrow-right-circle';

describe('LmnArrowRightCircleIcon', () => {
  it('renders an svg', async () => {
    const { fixture } = await render(LmnArrowRightCircleIcon);
    expect(fixture.nativeElement.querySelector('svg')).toBeInTheDocument();
  });

  it('is aria-hidden by default', async () => {
    const { fixture } = await render(LmnArrowRightCircleIcon);
    expect(fixture.nativeElement.getAttribute('aria-hidden')).toBe('true');
  });

  it('accepts animate input as boolean', async () => {
    const { fixture } = await render(LmnArrowRightCircleIcon, {
      componentInputs: { animate: true },
    });
    expect(fixture.componentInstance.animate()).toBe(true);
  });
});
