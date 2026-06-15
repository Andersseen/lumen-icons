import { render } from '@testing-library/angular';
import { describe, expect, it } from 'vitest';
import { LmnArrowSmallDownIcon } from './arrow-small-down';

describe('LmnArrowSmallDownIcon', () => {
  it('renders an svg', async () => {
    const { fixture } = await render(LmnArrowSmallDownIcon);
    expect(fixture.nativeElement.querySelector('svg')).toBeInTheDocument();
  });

  it('is aria-hidden by default', async () => {
    const { fixture } = await render(LmnArrowSmallDownIcon);
    expect(fixture.nativeElement.getAttribute('aria-hidden')).toBe('true');
  });

  it('accepts animate input as boolean', async () => {
    const { fixture } = await render(LmnArrowSmallDownIcon, {
      componentInputs: { animate: true },
    });
    expect(fixture.componentInstance.animate()).toBe(true);
  });
});
