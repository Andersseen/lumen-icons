import { render } from '@testing-library/angular';
import { describe, expect, it } from 'vitest';
import { LmnArrowSmallLeftIcon } from './arrow-small-left';

describe('LmnArrowSmallLeftIcon', () => {
  it('renders an svg', async () => {
    const { fixture } = await render(LmnArrowSmallLeftIcon);
    expect(fixture.nativeElement.querySelector('svg')).toBeInTheDocument();
  });

  it('is aria-hidden by default', async () => {
    const { fixture } = await render(LmnArrowSmallLeftIcon);
    expect(fixture.nativeElement.getAttribute('aria-hidden')).toBe('true');
  });

  it('accepts animate input as boolean', async () => {
    const { fixture } = await render(LmnArrowSmallLeftIcon, {
      componentInputs: { animate: true },
    });
    expect(fixture.componentInstance.animate()).toBe(true);
  });
});
